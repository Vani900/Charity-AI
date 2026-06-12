/**
 * helpers.js — Selenium WebDriver utility functions for CharityAI E2E suite
 * All helpers are async and designed for robust wait-for-element patterns.
 */
const { By, until, Key } = require('selenium-webdriver');
const config = require('./config');

// ─── Element Interaction ───────────────────────────────────────────────────

/**
 * Wait for an element to be located and visible in the DOM.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {import('selenium-webdriver').By} locator
 * @param {number} [timeout]
 * @returns {Promise<import('selenium-webdriver').WebElement>}
 */
async function waitFor(driver, locator, timeout = config.ELEMENT_WAIT) {
  const el = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(el), timeout);
  return el;
}

/**
 * Wait for element, then click. Retries on stale element.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {import('selenium-webdriver').By} locator
 * @param {number} [timeout]
 */
async function click(driver, locator, timeout = config.ELEMENT_WAIT) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const el = await waitFor(driver, locator, timeout);
      await driver.wait(until.elementIsEnabled(el), timeout);
      await driver.sleep(150);
      await el.click();
      return el;
    } catch (err) {
      if (attempt === 2) throw err;
      await driver.sleep(500);
    }
  }
}

/**
 * Click using JavaScript executor (for elements hidden behind overlays).
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {import('selenium-webdriver').By} locator
 */
async function jsClick(driver, locator) {
  const el = await waitFor(driver, locator);
  await driver.executeScript('arguments[0].click();', el);
  return el;
}

/**
 * Fill an input field — clear and type text.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {import('selenium-webdriver').By} locator
 * @param {string} text
 * @param {boolean} [clear=true]
 */
async function fillInput(driver, locator, text, clear = true) {
  const el = await waitFor(driver, locator);
  if (clear) {
    await el.clear();
    // Also Ctrl+A + Delete to handle browser quirks
    await el.sendKeys(Key.CONTROL, 'a');
    await el.sendKeys(Key.DELETE);
  }
  await el.sendKeys(text);
  return el;
}

/**
 * Select a dropdown option by visible text.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {import('selenium-webdriver').By} locator
 * @param {string} visibleText
 */
async function selectOption(driver, locator, visibleText) {
  const select = await waitFor(driver, locator);
  const options = await select.findElements(By.tagName('option'));
  for (const opt of options) {
    const text = await opt.getText();
    if (text.trim() === visibleText) {
      await opt.click();
      return;
    }
  }
  throw new Error(`Option '${visibleText}' not found in dropdown`);
}

// ─── Assertion Helpers ─────────────────────────────────────────────────────

/**
 * Wait until page body contains given text.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {string} text
 * @param {number} [timeout]
 * @returns {Promise<boolean>}
 */
async function pageHasText(driver, text, timeout = config.ELEMENT_WAIT) {
  try {
    const body = await driver.wait(until.elementLocated(By.tagName('body')), timeout);
    await driver.wait(async () => {
      const bodyText = await body.getText();
      return bodyText.includes(text);
    }, timeout);
    return true;
  } catch {
    return false;
  }
}

/**
 * Assert page contains text — throws on failure.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {string} text
 * @param {string} [context] - label to include in the error
 */
async function assertPageHasText(driver, text, context = '') {
  const found = await pageHasText(driver, text);
  if (!found) {
    const url = await driver.getCurrentUrl();
    throw new Error(`[${context || text}] Text "${text}" not found on page ${url}`);
  }
}

/**
 * Check if current URL contains given fragment.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {string} fragment
 * @param {number} [timeout]
 * @returns {Promise<boolean>}
 */
async function currentUrlContains(driver, fragment, timeout = config.ELEMENT_WAIT) {
  try {
    await driver.wait(until.urlContains(fragment), timeout);
    return true;
  } catch {
    return false;
  }
}

/**
 * Assert current URL contains fragment — throws on failure.
 */
async function assertUrlContains(driver, fragment, context = '') {
  const ok = await currentUrlContains(driver, fragment);
  if (!ok) {
    const url = await driver.getCurrentUrl();
    throw new Error(`[${context}] Expected URL to contain "${fragment}" but got: ${url}`);
  }
}

/**
 * Check if an element exists (non-blocking, no throw).
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {import('selenium-webdriver').By} locator
 * @param {number} [timeout=3000]
 * @returns {Promise<boolean>}
 */
async function elementExists(driver, locator, timeout = 3000) {
  try {
    await driver.wait(until.elementLocated(locator), timeout);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get text from an element.
 */
async function getText(driver, locator) {
  const el = await waitFor(driver, locator);
  return el.getText();
}

/**
 * Get attribute from element.
 */
async function getAttribute(driver, locator, attr) {
  const el = await waitFor(driver, locator);
  return el.getAttribute(attr);
}

// ─── Page Scroll ──────────────────────────────────────────────────────────

async function scrollToBottom(driver) {
  await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
  await driver.sleep(600);
}

async function scrollToTop(driver) {
  await driver.executeScript('window.scrollTo(0, 0);');
  await driver.sleep(300);
}

async function scrollIntoView(driver, locator) {
  const el = await waitFor(driver, locator);
  await driver.executeScript('arguments[0].scrollIntoView({block:"center"});', el);
  await driver.sleep(300);
  return el;
}

// ─── Auth Helpers ─────────────────────────────────────────────────────────

/**
 * Ensure donor test account exists in the backend, then log in.
 * Registers the account first if it doesn't exist yet.
 * Reuses session if already on the dashboard.
 */
async function loginAsDonor(driver) {
  const hasSession = await driver.executeScript("return !!localStorage.getItem('charityai_user');");
  const url = await driver.getCurrentUrl();
  if (url.includes('/dashboard') && hasSession) return;

  await clearSession(driver);
  await _ensureUserExists(driver, {
    name: config.DONOR_NAME,
    email: config.DONOR_EMAIL,
    password: config.DONOR_PASSWORD,
    role: 'donor',
  });
  await _performLogin(driver, config.DONOR_EMAIL, config.DONOR_PASSWORD, 'Donor');
}

/**
 * Ensure NGO test account exists, then log in as NGO.
 */
async function loginAsNgo(driver) {
  await clearSession(driver);
  await _ensureUserExists(driver, {
    name: config.NGO_NAME,
    email: config.NGO_EMAIL,
    password: config.NGO_PASSWORD,
    role: 'ngo',
  });
  await _performLogin(driver, config.NGO_EMAIL, config.NGO_PASSWORD, 'NGO');
}

/**
 * Ensure admin test account exists, then log in as admin.
 */
async function loginAsAdmin(driver) {
  await clearSession(driver);
  await _ensureUserExists(driver, {
    name: 'Admin User',
    email: config.ADMIN_EMAIL,
    password: config.ADMIN_PASSWORD,
    role: 'admin',
  });
  await _performLogin(driver, config.ADMIN_EMAIL, config.ADMIN_PASSWORD, 'Admin');
}

/**
 * Silently register a user via the /register page if they don't exist.
 * After registration or if already exists, we navigate away and continue.
 */
async function _ensureUserExists(driver, { name, email, password, role }) {
  try {
    await driver.get(`${config.BASE_URL}/register`);

    // Pick the right role toggle
    if (role === 'ngo') {
      const ngoBtn = await elementExists(driver, By.xpath("//button[contains(text(),'I am an NGO')]"), 4000);
      if (ngoBtn) {
        await click(driver, By.xpath("//button[contains(text(),'I am an NGO')]"));
        await driver.sleep(300);
      }
    } else {
      const donorBtn = await elementExists(driver, By.xpath("//button[contains(text(),'I want to Donate')]"), 4000);
      if (donorBtn) {
        await click(driver, By.xpath("//button[contains(text(),'I want to Donate')]"));
        await driver.sleep(300);
      }
    }

    // Fill form
    const nameInput = await elementExists(driver, By.xpath("//input[@placeholder='John Doe']"), 3000);
    if (nameInput) await fillInput(driver, By.xpath("//input[@placeholder='John Doe']"), name);

    const emailInput = await elementExists(driver, By.xpath("//input[@type='email']"), 3000);
    if (emailInput) await fillInput(driver, By.xpath("//input[@type='email']"), email);

    const phoneInput = await elementExists(driver, By.xpath("//input[@type='tel']"), 2000);
    if (phoneInput) await fillInput(driver, By.xpath("//input[@type='tel']"), '9876543210');

    const addressInput = await elementExists(driver, By.xpath("//input[@placeholder='Chennai, Tamil Nadu']"), 2000);
    if (addressInput) await fillInput(driver, By.xpath("//input[@placeholder='Chennai, Tamil Nadu']"), 'Chennai, TN');

    const passInput = await elementExists(driver, By.xpath("//input[@type='password']"), 3000);
    if (passInput) await fillInput(driver, By.xpath("//input[@type='password']"), password);

    // Submit
    await click(driver, By.xpath("//button[@type='submit']"));
    await driver.sleep(2500);

    // After register: either on dashboard (success) or on register with error (duplicate = OK)
    // In either case we clear and move on
    await clearSession(driver);
  } catch (e) {
    // Registration attempt failed silently — user may already exist, try login directly
    await clearSession(driver);
  }
}

/**
 * Navigate to /login, fill credentials, and verify dashboard redirect.
 */
async function _performLogin(driver, email, password, roleName) {
  await driver.get(`${config.BASE_URL}/login`);
  await fillInput(driver, By.xpath("//input[@type='email']"),    email);
  await fillInput(driver, By.xpath("//input[@type='password']"), password);
  await click(driver, By.xpath("//button[@type='submit']"));

  const ok = await currentUrlContains(driver, 'dashboard', 10000);
  if (!ok) {
    const errText = await pageHasText(driver, 'Invalid') || await pageHasText(driver, 'error');
    throw new Error(`${roleName} login failed (${errText ? 'invalid credentials' : 'redirect timeout'}) — URL: ${await driver.getCurrentUrl()}`);
  }
  await driver.sleep(600);
}

/**
 * Clear browser localStorage and sessionStorage.
 */
async function clearSession(driver) {
  try {
    await driver.get(config.BASE_URL);
    await driver.executeScript('localStorage.clear(); sessionStorage.clear();');
  } catch {
    // Ignore navigation errors during cleanup
  }
}

// ─── Exports ──────────────────────────────────────────────────────────────

module.exports = {
  waitFor,
  click,
  jsClick,
  fillInput,
  selectOption,
  pageHasText,
  assertPageHasText,
  currentUrlContains,
  assertUrlContains,
  elementExists,
  getText,
  getAttribute,
  scrollToBottom,
  scrollToTop,
  scrollIntoView,
  loginAsDonor,
  loginAsNgo,
  loginAsAdmin,
  clearSession,
};
