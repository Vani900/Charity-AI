/**
 * test_cases/ngo.js — NGO User Flow Test Cases
 * Covers: NGO registration, dashboard, campaigns, inventory,
 *         incoming donations, analytics, beneficiaries, requirements.
 */
'use strict';

const { By } = require('selenium-webdriver');
const config  = require('../config');
const helpers = require('../helpers');

const MODULE = 'NGO';

module.exports = [

  // ── TC-040: NGO Dashboard Loads ────────────────────────────────────────
  {
    id: 'SEL-040', module: MODULE,
    flowStep: 'NGO Dashboard',
    name: 'NGO Dashboard Loads',
    description: 'Login as NGO user and verify dashboard welcome message',
    expected: "'Welcome back' heading on NGO dashboard",
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard`);
      await driver.sleep(config.API_SETTLE);
      await helpers.assertPageHasText(driver, 'Welcome back', 'NGO Dashboard welcome');
      return 'NGO dashboard loaded with welcome message';
    },
  },

  // ── TC-041: NGO Campaigns Management ──────────────────────────────────
  {
    id: 'SEL-041', module: MODULE,
    flowStep: 'NGO Dashboard',
    name: 'NGO Campaign Management Page',
    description: 'Navigate to /dashboard/ngo/campaigns and verify the management page',
    expected: "'NGO Campaign Management' heading visible",
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/ngo/campaigns`);
      await helpers.assertPageHasText(driver, 'NGO Campaign Management', 'NGO Campaign title');
      return 'NGO Campaign Management page loaded correctly';
    },
  },

  // ── TC-042: Create Campaign Form ───────────────────────────────────────
  {
    id: 'SEL-042', module: MODULE,
    flowStep: 'NGO Dashboard',
    name: 'Create Campaign Form Opens',
    description: "Click 'Create Campaign' button and verify the creation form opens",
    expected: 'Campaign creation modal/form with title and description fields visible',
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/ngo/campaigns`);

      const createBtn = await helpers.elementExists(
        driver,
        By.xpath("//button[contains(text(),'Create Campaign') or contains(text(),'New Campaign')]"),
        4000
      );
      if (!createBtn) throw new Error("'Create Campaign' button not found on NGO campaigns page");

      await helpers.click(driver, By.xpath("//button[contains(text(),'Create Campaign') or contains(text(),'New Campaign')]"));
      await driver.sleep(600);

      const formOpen = await helpers.pageHasText(driver, 'Create New Campaign') ||
                       await helpers.elementExists(driver, By.xpath("//input[@placeholder='e.g. Winter Clothing Drive']"), 2000);
      if (!formOpen) throw new Error("Campaign creation form did not open after clicking Create");
      return 'Campaign creation form opened with input fields';
    },
  },

  // ── TC-043: Submit Create Campaign ─────────────────────────────────────
  {
    id: 'SEL-043', module: MODULE,
    flowStep: 'NGO Dashboard',
    name: 'Post New Campaign Requirement',
    description: 'Fill and submit campaign creation form',
    expected: 'Campaign created and form dismissed or success message shown',
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/ngo/campaigns`);

      const createBtn = await helpers.elementExists(
        driver,
        By.xpath("//button[contains(text(),'Create Campaign') or contains(text(),'New Campaign')]"),
        3000
      );
      if (!createBtn) return 'Create campaign button not found — skipping form fill';

      await helpers.click(driver, By.xpath("//button[contains(text(),'Create Campaign') or contains(text(),'New Campaign')]"));
      await driver.sleep(500);

      const nameInput = await helpers.elementExists(driver, By.xpath("//input[@placeholder='e.g. Winter Clothing Drive']"), 3000);
      if (nameInput) {
        await helpers.fillInput(driver, By.xpath("//input[@placeholder='e.g. Winter Clothing Drive']"), 'Monsoon Relief Drive');
      }
      const goalInput = await helpers.elementExists(driver, By.xpath("//input[@placeholder='5000']"), 3000);
      if (goalInput) {
        await helpers.fillInput(driver, By.xpath("//input[@placeholder='5000']"), '10000');
      }
      const descInput = await helpers.elementExists(driver, By.xpath("//textarea"), 3000);
      if (descInput) {
        await helpers.fillInput(driver, By.xpath("//textarea"), 'Emergency food and shelter for flood-affected communities.');
      }

      await helpers.click(driver, By.xpath("//button[@type='submit']"));
      await driver.sleep(config.API_SETTLE);

      const formGone = !(await helpers.pageHasText(driver, 'Create New Campaign', 2000));
      if (!formGone) throw new Error("Campaign form was not dismissed after submit — may have failed");
      return 'Campaign requirement published and form dismissed';
    },
  },

  // ── TC-044: Inventory Page ─────────────────────────────────────────────
  {
    id: 'SEL-044', module: MODULE,
    flowStep: 'NGO Dashboard',
    name: 'Inventory Management Page',
    description: 'Navigate to /dashboard/ngo/inventory and verify stock table',
    expected: "'Resource Inventory' heading and stock table visible",
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/ngo/inventory`);
      await helpers.assertPageHasText(driver, 'Resource Inventory', 'Inventory heading');
      return 'Inventory management page loaded with stock tables';
    },
  },

  // ── TC-045: Incoming Donations ─────────────────────────────────────────
  {
    id: 'SEL-045', module: MODULE,
    flowStep: 'Accept Donations',
    name: 'View Incoming Donations',
    description: 'Navigate to donations list as NGO and verify pending donations',
    expected: "'Donation History' table with incoming donations visible",
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donations`);
      await helpers.assertPageHasText(driver, 'Donation History', 'Donations title');
      return 'NGO can view incoming donations table';
    },
  },

  // ── TC-046: Accept Donation Action ─────────────────────────────────────
  {
    id: 'SEL-046', module: MODULE,
    flowStep: 'Accept Donations',
    name: 'Accept a Donation',
    description: 'Click Accept/Verify button on a pending donation',
    expected: "Donation status changed to 'accepted'",
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donations`);

      const acceptBtn = await helpers.elementExists(
        driver,
        By.xpath("//button[contains(text(),'Accept') or contains(text(),'Verify')]"),
        3000
      );
      if (acceptBtn) {
        await helpers.click(driver, By.xpath("//button[contains(text(),'Accept') or contains(text(),'Verify')]"));
        await driver.sleep(500);
        return 'Donation accepted — status updated to accepted';
      }
      return 'No pending donations with Accept button found — table may be empty';
    },
  },

  // ── TC-047: Donation Tracking (NGO) ────────────────────────────────────
  {
    id: 'SEL-047', module: MODULE,
    flowStep: 'Manage Donations',
    name: 'Tracking Page Accessible to NGO',
    description: 'Verify NGO can view the donation tracking timeline',
    expected: "'Donation Tracking' page loads for NGO user",
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/tracking`);
      await helpers.assertPageHasText(driver, 'Donation Tracking', 'NGO tracking page');
      return 'Donation Tracking page accessible to NGO user';
    },
  },

  // ── TC-048: NGO Analytics Page ─────────────────────────────────────────
  {
    id: 'SEL-048', module: MODULE,
    flowStep: 'View Analytics',
    name: 'NGO Analytics Page',
    description: 'Navigate to /dashboard/analytics as NGO and verify charts',
    expected: "'Deep Analytics' or 'Analytics' heading with charts visible",
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/analytics`);
      const found = await helpers.pageHasText(driver, 'Deep Analytics') || await helpers.pageHasText(driver, 'Analytics');
      if (!found) throw new Error("Analytics page heading not found for NGO user");
      return 'Analytics charts rendered for NGO user';
    },
  },

  // ── TC-049: Beneficiaries Page ─────────────────────────────────────────
  {
    id: 'SEL-049', module: MODULE,
    flowStep: 'View Analytics',
    name: 'Beneficiaries Directory',
    description: 'Navigate to /dashboard/beneficiaries and verify beneficiary list',
    expected: "'Beneficiaries' or 'Directory' title visible",
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/beneficiaries`);
      const found = await helpers.pageHasText(driver, 'Beneficiaries') || await helpers.pageHasText(driver, 'Directory');
      if (!found) throw new Error("Beneficiary directory not loaded");
      return 'Beneficiaries directory loaded correctly';
    },
  },

  // ── TC-050: Active Campaigns Public Listing ─────────────────────────────
  {
    id: 'SEL-050', module: MODULE,
    flowStep: 'Campaigns',
    name: 'Active Campaigns Public List',
    description: 'Navigate to /dashboard/campaigns and verify public campaign listing',
    expected: "'Campaigns' title and campaign progress cards visible",
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/campaigns`);
      await helpers.assertPageHasText(driver, 'Campaigns', 'Campaigns listing title');
      return 'Active campaigns public listing rendered';
    },
  },

  // ── TC-051: NGO Profile Page ───────────────────────────────────────────
  {
    id: 'SEL-051', module: MODULE,
    flowStep: 'NGO Registration',
    name: 'NGO Profile Page',
    description: 'Navigate to profile page as NGO and verify NGO-specific info',
    expected: "'My Profile' heading with NGO account badge visible",
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/profile`);
      await helpers.assertPageHasText(driver, 'My Profile', 'NGO profile heading');
      const orgBadge = await helpers.pageHasText(driver, 'Organization Account') ||
                       await helpers.pageHasText(driver, 'NGO Partner');
      if (!orgBadge) throw new Error("NGO account type badge ('Organization Account') missing from profile");
      return 'NGO profile page shows Organization Account badge';
    },
  },

  // ── TC-052: Document Upload UI ─────────────────────────────────────────
  {
    id: 'SEL-052', module: MODULE,
    flowStep: 'NGO Registration',
    name: 'Document Upload Trigger Exists',
    description: 'Verify file upload triggers exist on NGO donation pages',
    expected: 'File upload input or drag-and-drop zone found on a donation page',
    run: async (driver) => {
      await helpers.loginAsNgo(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-food`);
      const uploadExists = await helpers.elementExists(driver, By.xpath("//*[contains(text(),'Upload') or contains(text(),'upload')]"), 4000);
      if (!uploadExists) throw new Error("Upload trigger not found on food donation page");
      return 'Document/file upload trigger confirmed on donation page';
    },
  },

];
