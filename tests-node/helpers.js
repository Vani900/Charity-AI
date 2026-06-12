const { By, until } = require('selenium-webdriver');

/**
 * Wait for an element to be located and visible.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {import('selenium-webdriver').Locator} locator
 * @param {number} timeout Ms to wait
 */
async function waitFor(driver, locator, timeout = 8000) {
  const element = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(element), timeout);
  return element;
}

/**
 * Wait for an element to be clickable and click it.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {import('selenium-webdriver').Locator} locator
 * @param {number} timeout
 */
async function click(driver, locator, timeout = 8000) {
  const element = await waitFor(driver, locator, timeout);
  await driver.wait(until.elementIsEnabled(element), timeout);
  // Optional small delay for interaction consistency
  await driver.sleep(200);
  await element.click();
  return element;
}

/**
 * Wait for an input, optionally clear it, and type text.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {import('selenium-webdriver').Locator} locator
 * @param {string} text
 * @param {boolean} clear
 */
async function fillInput(driver, locator, text, clear = true) {
  const element = await waitFor(driver, locator);
  if (clear) {
    await element.clear();
  }
  await element.sendKeys(text);
  return element;
}

/**
 * Checks if a specific text exists anywhere in the body.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {string} text
 * @param {number} timeout
 * @returns {Promise<boolean>}
 */
async function pageHasText(driver, text, timeout = 6000) {
  try {
    const body = await waitFor(driver, By.tagName('body'), timeout);
    await driver.wait(async () => {
      const bodyText = await body.getText();
      return bodyText.includes(text);
    }, timeout);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Checks if the current URL contains the given substring.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {string} fragment
 * @param {number} timeout
 * @returns {Promise<boolean>}
 */
async function currentUrlContains(driver, fragment, timeout = 6000) {
  try {
    await driver.wait(until.urlContains(fragment), timeout);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Checks if an element exists.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {import('selenium-webdriver').Locator} locator
 * @param {number} timeout
 * @returns {Promise<boolean>}
 */
async function elementExists(driver, locator, timeout = 3000) {
  try {
    await driver.wait(until.elementLocated(locator), timeout);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Scrolls to the bottom of the page.
 * @param {import('selenium-webdriver').WebDriver} driver
 */
async function scrollToBottom(driver) {
  await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
  await driver.sleep(500);
}

/**
 * Scrolls to the top of the page.
 * @param {import('selenium-webdriver').WebDriver} driver
 */
async function scrollToTop(driver) {
  await driver.executeScript("window.scrollTo(0, 0);");
  await driver.sleep(300);
}

module.exports = {
  waitFor,
  click,
  fillInput,
  pageHasText,
  currentUrlContains,
  elementExists,
  scrollToBottom,
  scrollToTop
};
