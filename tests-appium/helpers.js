/**
 * Helper actions for Appium WebdriverIO tests.
 */

/**
 * Wait for element to exist and be displayed.
 * @param {import('webdriverio').Browser} driver
 * @param {string} selector
 * @param {number} timeout
 */
async function waitFor(driver, selector, timeout = 10000) {
  const element = await driver.$(selector);
  await element.waitForExist({ timeout });
  await element.waitForDisplayed({ timeout });
  return element;
}

/**
 * Wait for element to be clickable and click it.
 * @param {import('webdriverio').Browser} driver
 * @param {string} selector
 * @param {number} timeout
 */
async function click(driver, selector, timeout = 10000) {
  const element = await waitFor(driver, selector, timeout);
  await driver.waitUntil(async () => await element.isClickable(), {
    timeout,
    timeoutMsg: `Element ${selector} was not clickable`
  });
  await driver.pause(100);
  await element.click();
  return element;
}

/**
 * Wait for input, clear, and enter text.
 * @param {import('webdriverio').Browser} driver
 * @param {string} selector
 * @param {string} text
 * @param {boolean} clear
 */
async function fillInput(driver, selector, text, clear = true) {
  const element = await waitFor(driver, selector);
  if (clear) {
    await element.clearValue();
  }
  await element.setValue(text);
  return element;
}

/**
 * Checks if text is present inside the body element.
 * @param {import('webdriverio').Browser} driver
 * @param {string} text
 * @param {number} timeout
 */
async function pageHasText(driver, text, timeout = 6000) {
  try {
    const body = await waitFor(driver, 'body', timeout);
    await driver.waitUntil(async () => {
      const bodyText = await body.getText();
      return bodyText.includes(text);
    }, { timeout });
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Checks if current URL contains a fragment.
 * @param {import('webdriverio').Browser} driver
 * @param {string} fragment
 * @param {number} timeout
 */
async function currentUrlContains(driver, fragment, timeout = 6000) {
  try {
    await driver.waitUntil(async () => {
      const url = await driver.getUrl();
      return url.includes(fragment);
    }, { timeout });
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Checks if element exists and is visible.
 * @param {import('webdriverio').Browser} driver
 * @param {string} selector
 * @param {number} timeout
 */
async function elementExists(driver, selector, timeout = 3000) {
  try {
    const element = await driver.$(selector);
    return await element.isExisting() && await element.isDisplayed();
  } catch (err) {
    return false;
  }
}

/**
 * Switch driver context between WebView and Native App.
 * @param {import('webdriverio').Browser} driver
 * @param {boolean} toWebview
 */
async function switchContext(driver, toWebview = true) {
  try {
    const contexts = await driver.getContexts();
    console.log(`   📱 Available contexts:`, contexts);
    if (toWebview) {
      const webview = contexts.find(c => c.includes('WEBVIEW'));
      if (webview) {
        await driver.switchContext(webview);
        console.log(`   🛸 Switched to WebView: ${webview}`);
        return true;
      }
      console.warn("   ⚠️ WebView context not available yet.");
      return false;
    } else {
      await driver.switchContext('NATIVE_APP');
      console.log("   🛸 Switched back to Native App context.");
      return true;
    }
  } catch (err) {
    console.warn("   ⚠️ Failed to switch context:", err.message);
    return false;
  }
}

/**
 * Scroll to bottom (native/web standard).
 * @param {import('webdriverio').Browser} driver
 */
async function scrollToBottom(driver) {
  await driver.execute(() => window.scrollTo(0, document.body.scrollHeight));
  await driver.pause(500);
}

/**
 * Scroll to top (native/web standard).
 * @param {import('webdriverio').Browser} driver
 */
async function scrollToTop(driver) {
  await driver.execute(() => window.scrollTo(0, 0));
  await driver.pause(300);
}

module.exports = {
  waitFor,
  click,
  fillInput,
  pageHasText,
  currentUrlContains,
  elementExists,
  switchContext,
  scrollToBottom,
  scrollToTop
};
