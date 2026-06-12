const { Builder, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');

const config = require('./config');
const TestReporter = require('./reporter');

// Import Test Cases
const authTests = require('./test_cases/auth');
const donorTests = require('./test_cases/donor');
const ngoTests = require('./test_cases/ngo');
const adminTests = require('./test_cases/admin');
const edgeTests = require('./test_cases/edge_cases');

const allTests = [
  ...authTests,
  ...donorTests,
  ...ngoTests,
  ...adminTests,
  ...edgeTests
];

async function runSuite() {
  console.log('============================================================');
  console.log('   Starting CharityAI E2E Selenium Test Suite (Node.js)');
  console.log(`   Target App URL: ${config.BASE_URL}`);
  console.log(`   Headless Mode : ${config.HEADLESS}`);
  console.log('============================================================\n');

  // Initialize WebDriver
  const options = new chrome.Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--window-size=1440,900');
  options.addArguments('--disable-blink-features=AutomationControlled');
  options.excludeSwitches('enable-automation');

  if (config.HEADLESS) {
    options.addArguments('--headless=new');
  }

  let driver;
  try {
    const service = new chrome.ServiceBuilder(config.CHROMEDRIVER_PATH);
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .setChromeService(service)
      .build();
    
    // Set timeouts
    await driver.manage().setTimeouts({ implicit: 8000, pageLoad: 30000 });
  } catch (err) {
    console.error('\x1b[31m❌ Failed to initialize Chrome WebDriver:\x1b[0m', err.message);
    console.error('Please make sure Google Chrome is installed on the system.');
    process.exit(1);
  }

  const reporter = new TestReporter();
  const totalTests = allTests.length;
  let passedCount = 0;
  let failedCount = 0;

  try {
    for (let i = 0; i < totalTests; i++) {
      const test = allTests[i];
      const testNum = i + 1;
      
      console.log(`[${testNum}/${totalTests}] Running ${test.id}: ${test.name} (${test.module} - ${test.flowStep})...`);
      const start = Date.now();
      
      let status = 'PASS';
      let actual = '';
      let errorMsg = '';
      let screenshotPath = '';

      try {
        actual = await test.run(driver);
        passedCount++;
        console.log(`   \x1b[32mPASS: ${actual}\x1b[0m`);
      } catch (err) {
        status = 'FAIL';
        failedCount++;
        errorMsg = err.message;
        actual = 'Verification step failed or timed out';
        console.error(`   \x1b[31mFAIL: ${err.message}\x1b[0m`);

        // Capture screenshot on failure
        try {
          const screenshotData = await driver.takeScreenshot();
          const ts = new Date().toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '');
          screenshotPath = path.join(__dirname, 'results', 'screenshots', `${test.id}_fail_${ts}.png`);
          fs.writeFileSync(screenshotPath, screenshotData, 'base64');
          console.log(`   📷 Screenshot saved: ${screenshotPath}`);
        } catch (ssErr) {
          console.error(`   ⚠️ Failed to capture failure screenshot: ${ssErr.message}`);
        }
      } finally {
        const duration = (Date.now() - start) / 1000;
        
        reporter.record(
          test.module,
          test.flowStep,
          test.name,
          test.description,
          test.expected,
          actual,
          status,
          duration,
          errorMsg,
          screenshotPath
        );

        // Pause slightly between test cases for visual layout rendering
        await driver.sleep(400);
      }
    }

    console.log('\n============================================================');
    console.log('   All tests completed. Writing reports...');
    console.log('============================================================');

    await reporter.save();

    console.log(`Test Execution Summary:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed     : ${passedCount}`);
    console.log(`   Failed     : ${failedCount}`);
    console.log(`   Success %  : ${((passedCount / totalTests) * 100).toFixed(1)}%\n`);

  } catch (globalErr) {
    console.error('An unexpected error occurred during test suite run:', globalErr);
  } finally {
    if (driver) {
      await driver.quit();
      console.log('Browser closed. WebDriver cleaned up.');
    }
  }
}

if (require.main === module) {
  runSuite();
}
