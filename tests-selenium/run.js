/**
 * run.js — CharityAI Selenium WebDriver E2E Test Runner
 *
 * Usage:
 *   node run.js                     → Run all tests
 *   node run.js --suite=auth        → Run Auth tests only
 *   node run.js --suite=donor       → Run Donor tests only
 *   node run.js --suite=ngo         → Run NGO tests only
 *   node run.js --suite=admin       → Run Admin tests only
 *   node run.js --suite=edge        → Run Edge Case tests only
 *   HEADLESS=true node run.js       → Headless mode (CI)
 */

'use strict';

const { Builder, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path   = require('path');
const fs     = require('fs');

const config   = require('./config');
const reporter = require('./reporter');

// ── Test Case Suites ─────────────────────────────────────────────────────
const authTests  = require('./test_cases/auth');
const donorTests = require('./test_cases/donor');
const ngoTests   = require('./test_cases/ngo');
const adminTests = require('./test_cases/admin');
const edgeTests  = require('./test_cases/edge_cases');

const SUITES = {
  auth:  authTests,
  donor: donorTests,
  ngo:   ngoTests,
  admin: adminTests,
  edge:  edgeTests,
};

// ── ANSI Colours ─────────────────────────────────────────────────────────
const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  green:  '\x1b[32m',
  red:    '\x1b[31m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  blue:   '\x1b[34m',
  magenta:'\x1b[35m',
  white:  '\x1b[37m',
};

function banner(lines, color = C.cyan) {
  const width = 68;
  const border = '='.repeat(width);
  console.log(`${color}${border}${C.reset}`);
  lines.forEach(l => {
    const padded = l.padEnd(width - 4);
    console.log(`${color}   ${C.bold}${padded}${C.reset}`);
  });
  console.log(`${color}${border}${C.reset}`);
}

// ── Parse CLI Arguments ───────────────────────────────────────────────────

function parseSuiteArg() {
  const arg = process.argv.find(a => a.startsWith('--suite='));
  return arg ? arg.split('=')[1].toLowerCase() : null;
}

function buildTestList(suiteKey) {
  if (!suiteKey) {
    return [
      ...authTests,
      ...donorTests,
      ...ngoTests,
      ...adminTests,
      ...edgeTests,
    ];
  }
  if (!SUITES[suiteKey]) {
    console.error(`${C.red}Unknown suite: "${suiteKey}". Choose from: auth, donor, ngo, admin, edge${C.reset}`);
    process.exit(1);
  }
  return SUITES[suiteKey];
}

// ── Build Chrome WebDriver ────────────────────────────────────────────────

async function buildDriver() {
  const options = new chrome.Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments(`--window-size=${config.BROWSER_WIDTH},${config.BROWSER_HEIGHT}`);
  options.addArguments('--disable-blink-features=AutomationControlled');
  options.addArguments('--disable-extensions');
  options.addArguments('--disable-infobars');
  options.excludeSwitches('enable-automation');
  options.addArguments('--log-level=3'); // suppress Chrome INFO noise

  if (config.HEADLESS) {
    options.addArguments('--headless=new');
    options.addArguments('--disable-gpu');
  }

  const service = new chrome.ServiceBuilder(config.CHROMEDRIVER_PATH);

  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .setChromeService(service)
    .build();

  await driver.manage().setTimeouts({
    implicit: config.IMPLICIT_WAIT,
    pageLoad: config.PAGE_LOAD,
  });

  return driver;
}

// ── Screenshot Helper ─────────────────────────────────────────────────────

async function captureFailureScreenshot(driver, testId) {
  try {
    const imgData = await driver.takeScreenshot();
    const ts = new Date().toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '');
    const screenshotPath = path.join(__dirname, 'results', 'screenshots', `${testId}_FAIL_${ts}.png`);
    fs.writeFileSync(screenshotPath, imgData, 'base64');
    return screenshotPath;
  } catch (ssErr) {
    console.error(`   ${C.yellow}⚠️  Screenshot capture failed: ${ssErr.message}${C.reset}`);
    return '';
  }
}

// ── Main Test Runner ─────────────────────────────────────────────────────

async function runSuite() {
  const suiteKey = parseSuiteArg();
  const allTests = buildTestList(suiteKey);

  banner([
    '🧪 CharityAI — Selenium WebDriver E2E Test Suite',
    `   Suite    : ${suiteKey ? suiteKey.toUpperCase() : 'ALL'}`,
    `   URL      : ${config.BASE_URL}`,
    `   Tests    : ${allTests.length}`,
    `   Headless : ${config.HEADLESS}`,
    `   Started  : ${new Date().toLocaleString()}`,
  ], C.cyan);
  console.log();

  // ── Initialize WebDriver ──────────────────────────────────────────────
  let driver;
  try {
    driver = await buildDriver();
    console.log(`${C.green}✓ ChromeDriver initialized successfully${C.reset}\n`);
  } catch (err) {
    console.error(`${C.red}❌ Failed to initialize ChromeDriver:${C.reset}`);
    console.error(`   ${err.message}`);
    console.error(`\n   Ensure Google Chrome is installed and ChromeDriver path is correct.`);
    console.error(`   Current path: ${config.CHROMEDRIVER_PATH}`);
    process.exit(1);
  }

  const testReporter = new reporter();
  const totalTests  = allTests.length;
  let passedCount   = 0;
  let failedCount   = 0;
  let skippedCount  = 0;
  const failedTests = [];

  // ── Run Tests ────────────────────────────────────────────────────────
  try {
    for (let i = 0; i < totalTests; i++) {
      const test   = allTests[i];
      const testNum = i + 1;
      const prefix  = `[${String(testNum).padStart(2, '0')}/${totalTests}]`;

      console.log(`${C.dim}${prefix}${C.reset} ${C.bold}${test.name}${C.reset} ${C.dim}(${test.module} → ${test.flowStep})${C.reset}`);

      const start = Date.now();
      let status       = 'PASS';
      let actualResult = '';
      let errorMsg     = '';
      let screenshot   = '';

      try {
        actualResult = await test.run(driver);
        passedCount++;
        console.log(`        ${C.green}✅ PASS${C.reset} — ${actualResult}`);
      } catch (err) {
        status       = 'FAIL';
        failedCount++;
        errorMsg     = err.message || String(err);
        actualResult = 'Assertion failed or element not found';
        console.error(`        ${C.red}❌ FAIL${C.reset} — ${errorMsg}`);
        failedTests.push({ id: test.id, name: test.name, error: errorMsg });

        // Capture failure screenshot
        screenshot = await captureFailureScreenshot(driver, test.id);
        if (screenshot) {
          console.log(`        ${C.yellow}📷 Screenshot: ${path.basename(screenshot)}${C.reset}`);
        }
      } finally {
        const duration = (Date.now() - start) / 1000;
        testReporter.record(
          test.module,
          test.flowStep,
          test.name,
          test.description,
          test.expected,
          actualResult,
          status,
          duration,
          errorMsg,
          screenshot
        );
        // Small pause for rendering
        await driver.sleep(350);
      }
    }

    // ── Save Report ──────────────────────────────────────────────────
    console.log();
    banner([
      '📊 All tests completed — generating Excel report...',
    ], C.blue);

    await testReporter.save();

    // ── Print Final Summary ──────────────────────────────────────────
    const passRate = ((passedCount / totalTests) * 100).toFixed(1);
    console.log();
    banner([
      '📋 Test Execution Summary',
      `   Total Tests : ${totalTests}`,
      `   ✅ Passed   : ${passedCount}`,
      `   ❌ Failed   : ${failedCount}`,
      `   ⏭️  Skipped  : ${skippedCount}`,
      `   📈 Pass Rate : ${passRate}%`,
    ], passedCount === totalTests ? C.green : C.yellow);

    // ── Print Failures ───────────────────────────────────────────────
    if (failedTests.length > 0) {
      console.log(`\n${C.red}${C.bold}Failed Tests:${C.reset}`);
      failedTests.forEach((t, i) => {
        console.log(`  ${C.red}${i + 1}. ${t.id} — ${t.name}${C.reset}`);
        console.log(`     ${C.dim}${t.error.substring(0, 120)}${C.reset}`);
      });
    }

    console.log();
    if (passedCount === totalTests) {
      console.log(`${C.green}${C.bold}🎉 PERFECT RUN — All ${totalTests} tests passed!${C.reset}\n`);
    } else {
      console.log(`${C.yellow}${C.bold}⚠️  Suite completed with ${failedCount} failure(s). Review the Excel report for details.${C.reset}\n`);
    }

    // Exit with non-zero code on failures for CI pipelines
    process.exitCode = failedCount > 0 ? 1 : 0;

  } catch (globalErr) {
    console.error(`\n${C.red}An unexpected error occurred during the test run:${C.reset}`);
    console.error(globalErr);
    process.exitCode = 2;
  } finally {
    if (driver) {
      await driver.quit();
      console.log(`${C.dim}Browser closed. WebDriver session ended.${C.reset}\n`);
    }
  }
}

// ── Entry Point ──────────────────────────────────────────────────────────
if (require.main === module) {
  runSuite();
}

module.exports = { runSuite };
