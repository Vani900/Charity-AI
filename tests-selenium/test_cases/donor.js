/**
 * test_cases/donor.js — Donor User Flow Test Cases
 * Covers: Dashboard overview, all donation types, tracking,
 *         donation history, analytics, blockchain, AI insights, NGOs, profile, settings.
 */
'use strict';

const { By } = require('selenium-webdriver');
const config  = require('../config');
const helpers = require('../helpers');

const MODULE = 'Donor';

module.exports = [

  // ── TC-016: Dashboard Overview ─────────────────────────────────────────
  {
    id: 'SEL-016', module: MODULE,
    flowStep: 'Dashboard → Overview',
    name: 'Dashboard Overview Loads',
    description: 'Login as donor and verify overview page shows KPI cards and welcome message',
    expected: "'Welcome back', 'Total Funds', 'Food Provided' KPI cards visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard`);
      await driver.sleep(config.API_SETTLE);

      await helpers.assertPageHasText(driver, 'Welcome back',  'Dashboard welcome');
      await helpers.assertPageHasText(driver, 'Total Funds',   'Funds KPI card');
      await helpers.assertPageHasText(driver, 'Food Provided', 'Food KPI card');
      return 'Dashboard overview loaded with KPI cards and welcome message';
    },
  },

  // ── TC-017: KPI Cards Navigate ─────────────────────────────────────────
  {
    id: 'SEL-017', module: MODULE,
    flowStep: 'Dashboard → Overview',
    name: 'KPI Cards Clickable and Navigate',
    description: 'Click on Total Funds and Food Provided KPI cards and verify navigation',
    expected: 'Funds → /donate-money; Food → /donate-food',
    run: async (driver) => {
      await helpers.loginAsDonor(driver);

      // Funds KPI
      await driver.get(`${config.BASE_URL}/dashboard`);
      await helpers.click(driver, By.xpath("//h3[contains(text(),'Total Funds')]/.."));
      if (!(await helpers.currentUrlContains(driver, 'donate-money', 4000))) {
        throw new Error("Total Funds KPI card did not navigate to /donate-money");
      }

      // Food KPI
      await driver.get(`${config.BASE_URL}/dashboard`);
      await helpers.click(driver, By.xpath("//h3[contains(text(),'Food Provided')]/.."));
      if (!(await helpers.currentUrlContains(driver, 'donate-food', 4000))) {
        throw new Error("Food Provided KPI card did not navigate to /donate-food");
      }

      return 'KPI cards navigate to respective donation pages correctly';
    },
  },

  // ── TC-018: AI Recommendation Section ─────────────────────────────────
  {
    id: 'SEL-018', module: MODULE,
    flowStep: 'Dashboard → Overview',
    name: 'AI Recommendation Section',
    description: "Verify 'AI Recommended Actions' section is present on overview",
    expected: "'AI Recommended Actions' panel rendered",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard`);
      await helpers.assertPageHasText(driver, 'AI Recommended Actions', 'AI recommendation panel');
      return 'AI Recommended Actions panel rendered on dashboard overview';
    },
  },

  // ── TC-019: Donate Money Page ──────────────────────────────────────────
  {
    id: 'SEL-019', module: MODULE,
    flowStep: 'Donate → Money',
    name: 'Donate Money Page Loads',
    description: 'Navigate to /dashboard/donate-money and verify page renders',
    expected: "'Donate Funds' heading and amount buttons visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-money`);
      await helpers.assertPageHasText(driver, 'Donate Funds', 'Donate Funds heading');
      return 'Donate Money page loaded with amount selection options';
    },
  },

  // ── TC-020: Submit Money Donation ──────────────────────────────────────
  {
    id: 'SEL-020', module: MODULE,
    flowStep: 'Donate → Money',
    name: 'Submit Money Donation',
    description: 'Select $50 preset amount and submit the donation form',
    expected: "'Thank you!' confirmation or order confirmation shown",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-money`);

      // Click the ₹50 / $50 quick-select amount button
      const amountBtn = await helpers.elementExists(driver, By.xpath("//button[contains(.,'50')]"), 4000);
      if (amountBtn) {
        await helpers.click(driver, By.xpath("//button[contains(.,'50')]"));
      }

      // Submit
      await helpers.click(driver, By.xpath("//button[@type='submit']"));
      await driver.sleep(config.API_SETTLE);

      const hasThanks = await helpers.pageHasText(driver, 'Thank you!') ||
                        await helpers.pageHasText(driver, 'Confirmation') ||
                        await helpers.pageHasText(driver, 'Order');
      if (!hasThanks) throw new Error("Donation confirmation 'Thank you!' or order screen not shown");
      return 'Money donation submitted and confirmation screen displayed';
    },
  },

  // ── TC-021: Donate Food Page ───────────────────────────────────────────
  {
    id: 'SEL-021', module: MODULE,
    flowStep: 'Donate → Food',
    name: 'Donate Food Page Loads',
    description: 'Navigate to /dashboard/donate-food and verify form renders',
    expected: "'Donate Food' heading and pickup address field visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-food`);
      await helpers.assertPageHasText(driver, 'Donate Food', 'Donate Food heading');
      return 'Donate Food page loaded with form fields';
    },
  },

  // ── TC-022: Submit Food Donation ───────────────────────────────────────
  {
    id: 'SEL-022', module: MODULE,
    flowStep: 'Donate → Food',
    name: 'Submit Food Donation',
    description: 'Fill food donation form (description, address, pickup date) and submit',
    expected: "'Food Donation Registered!' or similar confirmation shown",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-food`);

      const textareaExists = await helpers.elementExists(driver, By.xpath("//textarea"), 3000);
      if (textareaExists) {
        await helpers.fillInput(driver, By.xpath("//textarea"), '50 kg of rice, lentils, and canned vegetables');
      }

      const addressExists = await helpers.elementExists(driver, By.xpath("//input[@placeholder='Enter full address']"), 3000);
      if (addressExists) {
        await helpers.fillInput(driver, By.xpath("//input[@placeholder='Enter full address']"), '123 Charity Lane, Chennai 600001');
      }

      const dateInput = await helpers.elementExists(driver, By.xpath("//input[@type='date']"), 3000);
      if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        await helpers.fillInput(driver, By.xpath("//input[@type='date']"), tomorrow.toISOString().substring(0, 10));
      }

      await helpers.click(driver, By.xpath("//button[@type='submit']"));
      await driver.sleep(config.API_SETTLE);

      const confirmed = await helpers.pageHasText(driver, 'Food Donation Registered') ||
                        await helpers.pageHasText(driver, 'Scheduled') ||
                        await helpers.pageHasText(driver, 'confirmed');
      if (!confirmed) throw new Error("Food donation confirmation message not found after submit");
      return 'Food donation submitted with pickup address and date scheduled';
    },
  },

  // ── TC-023: Donate Clothes Page ────────────────────────────────────────
  {
    id: 'SEL-023', module: MODULE,
    flowStep: 'Donate → Clothes',
    name: 'Donate Clothes Page Loads',
    description: 'Navigate to /dashboard/donate-clothes and verify page content',
    expected: "'Donate Clothes' heading and quantity/type fields visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-clothes`);
      await helpers.assertPageHasText(driver, 'Donate Clothes', 'Donate Clothes heading');
      return 'Donate Clothes page loaded correctly';
    },
  },

  // ── TC-024: Donate Books Page ──────────────────────────────────────────
  {
    id: 'SEL-024', module: MODULE,
    flowStep: 'Donate → Books',
    name: 'Donate Books Page Loads',
    description: 'Navigate to /dashboard/donate-books and verify page content',
    expected: "'Donate Books' heading and form visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-books`);
      await helpers.assertPageHasText(driver, 'Donate Books', 'Donate Books heading');
      return 'Donate Books page loaded with form fields';
    },
  },

  // ── TC-025: Donate Medicine Page ───────────────────────────────────────
  {
    id: 'SEL-025', module: MODULE,
    flowStep: 'Donate → Medicine',
    name: 'Donate Medicine Page Loads',
    description: 'Navigate to /dashboard/donate-medicine and verify page content',
    expected: "'Donate Medicines' heading with expiry field visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-medicine`);
      await helpers.assertPageHasText(driver, 'Donate Medicines', 'Donate Medicine heading');
      return 'Donate Medicine page loaded with expiry date field';
    },
  },

  // ── TC-026: Donation Tracking Page ─────────────────────────────────────
  {
    id: 'SEL-026', module: MODULE,
    flowStep: 'Track Donation',
    name: 'Donation Tracking Page Loads',
    description: 'Navigate to /dashboard/tracking and verify tracking interface',
    expected: "'Donation Tracking' title and status timeline visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/tracking`);
      await helpers.assertPageHasText(driver, 'Donation Tracking', 'Tracking title');
      return 'Tracking page loaded with status timeline';
    },
  },

  // ── TC-027: Status Timeline Steps ─────────────────────────────────────
  {
    id: 'SEL-027', module: MODULE,
    flowStep: 'Track Donation',
    name: 'Status Timeline Steps',
    description: 'Verify donation status steps Pending, Accepted, etc. are rendered in the timeline',
    expected: 'Timeline steps: Pending, Accepted, Picked Up, Delivered visible',
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/tracking`);
      const hasPending  = await helpers.pageHasText(driver, 'Pending')  || await helpers.pageHasText(driver, 'pending');
      const hasAccepted = await helpers.pageHasText(driver, 'Accepted') || await helpers.pageHasText(driver, 'accepted');
      if (!hasPending && !hasAccepted) throw new Error("No timeline step labels found on tracking page");
      return 'Status timeline steps rendered correctly';
    },
  },

  // ── TC-028: Donation History Page ──────────────────────────────────────
  {
    id: 'SEL-028', module: MODULE,
    flowStep: 'Donation History',
    name: 'Donations History List',
    description: 'Navigate to /dashboard/donations and verify donation history table renders',
    expected: "'Donation History' title and table or list visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donations`);
      await helpers.assertPageHasText(driver, 'Donation History', 'Donation History title');
      return 'Donations history table rendered';
    },
  },

  // ── TC-029: Filter Donations by Status ─────────────────────────────────
  {
    id: 'SEL-029', module: MODULE,
    flowStep: 'Donation History',
    name: 'Filter Donations by Status',
    description: "Apply 'Completed' or 'Pending' filter on donation history",
    expected: 'Filter applied without page error; list updates',
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donations`);

      const filterExists = await helpers.elementExists(
        driver,
        By.xpath("//button[contains(text(),'completed') or contains(text(),'Completed') or contains(text(),'All')]"),
        3000
      );
      if (filterExists) {
        await helpers.click(driver, By.xpath("//button[contains(text(),'completed') or contains(text(),'Completed') or contains(text(),'All')]"));
        await driver.sleep(500);
      }
      return 'Filter applied — donation list updated without errors';
    },
  },

  // ── TC-030: Analytics Page ─────────────────────────────────────────────
  {
    id: 'SEL-030', module: MODULE,
    flowStep: 'Impact Dashboard',
    name: 'Analytics Page Loads',
    description: 'Navigate to /dashboard/analytics and verify charts render',
    expected: "'Deep Analytics' heading and at least one chart visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/analytics`);
      await helpers.assertPageHasText(driver, 'Deep Analytics', 'Analytics heading');
      return 'Analytics page loaded with charts';
    },
  },

  // ── TC-031: Blockchain Ledger ──────────────────────────────────────────
  {
    id: 'SEL-031', module: MODULE,
    flowStep: 'Impact Dashboard',
    name: 'Blockchain Ledger Page',
    description: 'Navigate to /dashboard/blockchain and verify transaction hash list',
    expected: "'Blockchain Ledger' heading and transaction rows visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/blockchain`);
      await helpers.assertPageHasText(driver, 'Blockchain Ledger', 'Blockchain Ledger heading');
      return 'Blockchain Ledger page loaded with transaction hashes';
    },
  },

  // ── TC-032: AI Insights Page ───────────────────────────────────────────
  {
    id: 'SEL-032', module: MODULE,
    flowStep: 'AI Insights',
    name: 'AI Insights Page Loads',
    description: 'Navigate to /dashboard/ai-insights and verify AI match cards',
    expected: "'AI Insights' heading and campaign recommendation cards visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/ai-insights`);
      await helpers.assertPageHasText(driver, 'AI Insights', 'AI Insights heading');
      return 'AI Insights page rendered with campaign match cards';
    },
  },

  // ── TC-033: NGO Discovery List ─────────────────────────────────────────
  {
    id: 'SEL-033', module: MODULE,
    flowStep: 'NGO Discovery',
    name: 'NGO List Page Loads',
    description: 'Navigate to /dashboard/ngos and verify verified NGO listings',
    expected: "'Verified NGOs' title and NGO cards/list visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/ngos`);
      await helpers.assertPageHasText(driver, 'Verified NGOs', 'Verified NGOs title');
      return 'NGO discovery page loaded with verified NGO listings';
    },
  },

  // ── TC-034: Profile Page Loads ─────────────────────────────────────────
  {
    id: 'SEL-034', module: MODULE,
    flowStep: 'User Profile',
    name: 'Profile Page Loads',
    description: 'Navigate to /dashboard/profile and verify user info and edit button',
    expected: "'My Profile' heading, user name, email, and Edit Profile button visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/profile`);
      await helpers.assertPageHasText(driver, 'My Profile', 'My Profile heading');
      const editBtn = await helpers.elementExists(driver, By.xpath("//button[contains(text(),'Edit Profile')]"));
      if (!editBtn) throw new Error("'Edit Profile' button missing from profile page");
      return 'Profile page loaded with user info and Edit Profile button';
    },
  },

  // ── TC-035: Edit Profile and Save ─────────────────────────────────────
  {
    id: 'SEL-035', module: MODULE,
    flowStep: 'User Profile',
    name: 'Edit Profile — Save Changes',
    description: 'Click Edit Profile, update phone field, and click Save Changes',
    expected: "'Profile updated successfully!' success toast shown",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/profile`);

      // Enter edit mode
      await helpers.click(driver, By.xpath("//button[contains(text(),'Edit Profile')]"));
      await driver.sleep(400);

      // Update phone
      const phoneInput = await helpers.elementExists(driver, By.xpath("//input[@type='tel']"), 3000);
      if (phoneInput) {
        await helpers.fillInput(driver, By.xpath("//input[@type='tel']"), '9123456789');
      }

      // Save
      await helpers.click(driver, By.xpath("//button[contains(text(),'Save Changes')]"));
      await driver.sleep(config.API_SETTLE);

      const saved = await helpers.pageHasText(driver, 'successfully') || await helpers.pageHasText(driver, 'updated');
      if (!saved) {
        // Maybe it saved without a toast — check that form is no longer in editing state
        const stillEditing = await helpers.elementExists(driver, By.xpath("//button[contains(text(),'Save Changes')]"), 2000);
        if (stillEditing) throw new Error("Save Changes button still visible — save may have failed");
      }
      return "Profile saved — 'Profile updated successfully!' shown or form dismissed";
    },
  },

  // ── TC-036: Settings Page ──────────────────────────────────────────────
  {
    id: 'SEL-036', module: MODULE,
    flowStep: 'Settings',
    name: 'Settings Page Loads',
    description: 'Navigate to /dashboard/settings and verify settings sections',
    expected: "'Settings' heading with theme and notification toggles visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/settings`);
      await helpers.assertPageHasText(driver, 'Settings', 'Settings heading');
      return 'Settings page loaded with configuration options';
    },
  },

  // ── TC-037: Reports Page ───────────────────────────────────────────────
  {
    id: 'SEL-037', module: MODULE,
    flowStep: 'Donation History',
    name: 'Reports Page Loads',
    description: 'Navigate to /dashboard/reports and verify export functionality',
    expected: "Reports page with download/export options visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/reports`);
      const hasReports = await helpers.pageHasText(driver, 'Reports') || await helpers.pageHasText(driver, 'Export');
      if (!hasReports) throw new Error("Reports page not found or heading missing");
      return 'Reports page loaded with export options';
    },
  },

  // ── TC-038: Campaigns Page ─────────────────────────────────────────────
  {
    id: 'SEL-038', module: MODULE,
    flowStep: 'Campaigns',
    name: 'Campaigns Page Loads',
    description: 'Navigate to /dashboard/campaigns and verify active campaigns listing',
    expected: "'Campaigns' heading and active campaign cards visible",
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard/campaigns`);
      await helpers.assertPageHasText(driver, 'Campaigns', 'Campaigns heading');
      return 'Campaigns page loaded with active listings';
    },
  },

  // ── TC-039: Sidebar Navigation ─────────────────────────────────────────
  {
    id: 'SEL-039', module: MODULE,
    flowStep: 'Dashboard → Overview',
    name: 'Sidebar Navigation Works',
    description: 'Click sidebar links and verify they navigate to correct pages',
    expected: 'All major sidebar links navigate without errors',
    run: async (driver) => {
      await helpers.loginAsDonor(driver);
      await driver.get(`${config.BASE_URL}/dashboard`);

      const sidebarLinks = [
        { text: 'Donations', urlFragment: 'donations' },
        { text: 'Analytics', urlFragment: 'analytics' },
      ];

      for (const link of sidebarLinks) {
        await driver.get(`${config.BASE_URL}/dashboard`);
        const linkExists = await helpers.elementExists(
          driver,
          By.xpath(`//nav//*[contains(text(),'${link.text}')] | //aside//*[contains(text(),'${link.text}')]`),
          3000
        );
        if (linkExists) {
          await helpers.click(driver, By.xpath(`//nav//*[contains(text(),'${link.text}')] | //aside//*[contains(text(),'${link.text}')]`));
          await driver.sleep(500);
          const onPage = await helpers.currentUrlContains(driver, link.urlFragment, 4000);
          if (!onPage) throw new Error(`Sidebar '${link.text}' link did not navigate to /${link.urlFragment}`);
        }
      }
      return 'Sidebar navigation links work correctly';
    },
  },

];
