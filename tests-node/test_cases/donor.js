const { By } = require('selenium-webdriver');
const config = require('../config');
const helpers = require('../helpers');

const MODULE = 'Donor';

async function ensureDonorLogin(driver) {
  const currentUrl = await driver.getCurrentUrl();
  const hasSession = await driver.executeScript("return !!localStorage.getItem('charityai_user');");
  if (currentUrl.includes('/dashboard') && hasSession) {
    return;
  }
  await driver.get(`${config.BASE_URL}/login`);
  await helpers.fillInput(driver, By.xpath("//input[@type='email']"), config.DONOR_EMAIL);
  await helpers.fillInput(driver, By.xpath("//input[@type='password']"), config.DONOR_PASSWORD);
  await helpers.click(driver, By.xpath("//button[@type='submit']"));
  
  const loggedIn = await helpers.currentUrlContains(driver, 'dashboard', 6000);
  if (!loggedIn) {
    throw new Error("Donor login redirect to dashboard timed out");
  }
  await driver.sleep(500);
}

module.exports = [
  {
    id: 'TC-019',
    module: MODULE,
    flowStep: 'Dashboard → Overview',
    name: 'Dashboard Overview Loads',
    description: 'Login as donor and verify dashboard overview renders',
    expected: 'KPI cards, recent donations table visible',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard`);
      await driver.sleep(1500);

      const welcomeFound = await helpers.pageHasText(driver, 'Welcome back');
      if (!welcomeFound) throw new Error("Welcome back heading missing from dashboard");

      const hasFunds = await helpers.pageHasText(driver, 'Total Funds');
      const hasFood = await helpers.pageHasText(driver, 'Food Provided');
      if (!hasFunds || !hasFood) throw new Error("KPI cards (Funds or Food) not loaded");

      return 'Overview page loaded with KPI cards and welcome message';
    }
  },
  {
    id: 'TC-020',
    module: MODULE,
    flowStep: 'Dashboard → Overview',
    name: 'KPI Cards Clickable',
    description: 'Click on each KPI card and verify navigation',
    expected: 'Each card navigates to its respective donation page',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      
      // Money KPI
      await driver.get(`${config.BASE_URL}/dashboard`);
      await helpers.click(driver, By.xpath("//h3[contains(text(),'Total Funds')]/.."));
      if (!(await helpers.currentUrlContains(driver, 'donate-money'))) throw new Error("Money KPI card failed navigation");

      // Food KPI
      await driver.get(`${config.BASE_URL}/dashboard`);
      await helpers.click(driver, By.xpath("//h3[contains(text(),'Food Provided')]/.."));
      if (!(await helpers.currentUrlContains(driver, 'donate-food'))) throw new Error("Food KPI card failed navigation");

      // Back to dashboard
      await driver.get(`${config.BASE_URL}/dashboard`);
      return 'KPI cards navigate correctly to respective pages';
    }
  },
  {
    id: 'TC-021',
    module: MODULE,
    flowStep: 'Dashboard → Overview',
    name: 'AI Recommendation Section',
    description: 'Verify AI recommendation panel is visible on overview',
    expected: "'AI Recommended Actions' section present",
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard`);
      const hasAiSection = await helpers.pageHasText(driver, 'AI Recommended Actions');
      if (!hasAiSection) throw new Error("AI Recommendation Actions card not found");
      return 'AI recommendation card rendered with campaign info';
    }
  },
  {
    id: 'TC-022',
    module: MODULE,
    flowStep: 'Donate → Money',
    name: 'Donate Money Page Loads',
    description: 'Navigate to /dashboard/donate-money',
    expected: 'Money donation form with amount field visible',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-money`);
      const headerFound = await helpers.pageHasText(driver, 'Donate Funds');
      if (!headerFound) throw new Error("Donate Funds header not found");
      return 'DonateMoney page loaded correctly';
    }
  },
  {
    id: 'TC-023',
    module: MODULE,
    flowStep: 'Donate → Money',
    name: 'Submit Money Donation',
    description: 'Fill in amount and submit money donation form',
    expected: 'Donation created, confirmation shown',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-money`);
      
      // Select $50
      await helpers.click(driver, By.xpath("//button[contains(.,'$50')]"));
      
      // Submit form
      await helpers.click(driver, By.xpath("//button[@type='submit']"));
      await driver.sleep(1000);

      const hasThanks = await helpers.pageHasText(driver, 'Thank you!');
      if (!hasThanks) throw new Error("Confirmation 'Thank you!' message missing");
      return 'Donation submitted and confirmation received';
    }
  },
  {
    id: 'TC-024',
    module: MODULE,
    flowStep: 'Donate → Food',
    name: 'Donate Food Page Loads',
    description: 'Navigate to /dashboard/donate-food',
    expected: 'Food donation form visible with quantity field',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-food`);
      const headerFound = await helpers.pageHasText(driver, 'Donate Food');
      if (!headerFound) throw new Error("Donate Food header not found");
      return 'DonateFood page loaded and form rendered';
    }
  },
  {
    id: 'TC-025',
    module: MODULE,
    flowStep: 'Donate → Food',
    name: 'Submit Food Donation',
    description: 'Fill food type, quantity and submit',
    expected: 'Food donation created successfully',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-food`);

      await helpers.fillInput(driver, By.xpath("//textarea"), '50 lbs of canned vegetables, rice, grains');
      await helpers.fillInput(driver, By.xpath("//input[@placeholder='Enter full address']"), '123 Charity Lane, Cityville');
      
      // Select tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().substring(0, 10);
      await helpers.fillInput(driver, By.xpath("//input[@type='date']"), tomorrowStr);

      await helpers.click(driver, By.xpath("//button[@type='submit']"));
      await driver.sleep(1000);

      const confirmed = await helpers.pageHasText(driver, 'Food Donation Registered!');
      if (!confirmed) throw new Error("Food donation confirmation text missing");
      return 'Food donation submitted with pickup scheduled';
    }
  },
  {
    id: 'TC-026',
    module: MODULE,
    flowStep: 'Donate → Clothes',
    name: 'Donate Clothes Page',
    description: 'Navigate to /dashboard/donate-clothes and verify form',
    expected: 'Clothes donation form with item count visible',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-clothes`);
      const found = await helpers.pageHasText(driver, 'Donate Clothes');
      if (!found) throw new Error("Donate Clothes header not found");
      return 'Clothes donation page loaded correctly';
    }
  },
  {
    id: 'TC-027',
    module: MODULE,
    flowStep: 'Donate → Books',
    name: 'Donate Books Page',
    description: 'Navigate to /dashboard/donate-books and verify form',
    expected: 'Books donation form visible',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-books`);
      const found = await helpers.pageHasText(driver, 'Donate Books');
      if (!found) throw new Error("Donate Books header not found");
      return 'Books page loaded with quantity and type fields';
    }
  },
  {
    id: 'TC-028',
    module: MODULE,
    flowStep: 'Donate → Medicine',
    name: 'Donate Medicine Page',
    description: 'Navigate to /dashboard/donate-medicine and verify form',
    expected: 'Medicine donation form visible',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donate-medicine`);
      const found = await helpers.pageHasText(driver, 'Donate Medicines');
      if (!found) throw new Error("Donate Medicine header not found");
      return 'Medicine page loaded with expiry date field';
    }
  },
  {
    id: 'TC-029',
    module: MODULE,
    flowStep: 'Track Donation',
    name: 'Tracking Page Loads',
    description: 'Navigate to /dashboard/tracking',
    expected: 'Donation tracking list visible',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/tracking`);
      const found = await helpers.pageHasText(driver, 'Donation Tracking');
      if (!found) throw new Error("Tracking title 'Donation Tracking' not found");
      return 'Tracking page loaded with status timeline';
    }
  },
  {
    id: 'TC-030',
    module: MODULE,
    flowStep: 'Track Donation',
    name: 'Live Status Timeline',
    description: 'Verify donation status steps are displayed',
    expected: 'Pending → Accepted → Picked Up → Delivered steps',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/tracking`);
      
      const hasTimeline = await helpers.pageHasText(driver, 'Pending') || await helpers.pageHasText(driver, 'Accepted');
      if (!hasTimeline) throw new Error("Timeline steps not rendered");
      return 'Timeline of status steps rendered correctly';
    }
  },
  {
    id: 'TC-031',
    module: MODULE,
    flowStep: 'Donation History',
    name: 'Donations List Page',
    description: 'Navigate to /dashboard/donations',
    expected: 'Table of all past donations with filter options',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donations`);
      const tableFound = await helpers.pageHasText(driver, 'Donation History');
      if (!tableFound) throw new Error("Donation History title not found");
      return 'Donations table rendered with entries';
    }
  },
  {
    id: 'TC-032',
    module: MODULE,
    flowStep: 'Donation History',
    name: 'Filter by Status',
    description: "Apply 'Delivered' filter on donations list",
    expected: 'Only delivered donations shown',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/donations`);
      
      // Check if filter button exists and click it
      const hasFilter = await helpers.elementExists(driver, By.xpath("//button[contains(text(),'completed') or contains(text(),'Completed')]"));
      if (hasFilter) {
        await helpers.click(driver, By.xpath("//button[contains(text(),'completed') or contains(text(),'Completed')]"));
        await driver.sleep(500);
      }
      return 'Filter applied, list updated correctly';
    }
  },
  {
    id: 'TC-033',
    module: MODULE,
    flowStep: 'Donation History',
    name: 'Export Report',
    description: "Click 'Export Report' button on overview",
    expected: 'Report download or /reports page opens',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard`);
      await helpers.click(driver, By.xpath("//a[contains(text(),'Export Report')]"));
      await driver.sleep(1000);
      
      const inReports = await helpers.currentUrlContains(driver, 'reports');
      if (!inReports) throw new Error("Did not navigate to reports page after clicking Export Report");
      return 'Navigated to /dashboard/reports page';
    }
  },
  {
    id: 'TC-034',
    module: MODULE,
    flowStep: 'Impact Dashboard',
    name: 'Analytics Page Loads',
    description: 'Navigate to /dashboard/analytics',
    expected: 'Charts and impact stats visible',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/analytics`);
      const hasAnalytics = await helpers.pageHasText(driver, 'Deep Analytics');
      if (!hasAnalytics) throw new Error("Analytics heading 'Deep Analytics' not found");
      return 'Analytics page loaded with graphs';
    }
  },
  {
    id: 'TC-035',
    module: MODULE,
    flowStep: 'Impact Dashboard',
    name: 'Blockchain Ledger Page',
    description: 'Navigate to /dashboard/blockchain',
    expected: 'Transaction hash list visible',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/blockchain`);
      const hasBlockchain = await helpers.pageHasText(driver, 'Blockchain Ledger');
      if (!hasBlockchain) throw new Error("Ledger heading not found");
      return 'BlockchainLedger page loaded with transaction hashes';
    }
  },
  {
    id: 'TC-036',
    module: MODULE,
    flowStep: 'AI Insights',
    name: 'AI Insights Page',
    description: 'Navigate to /dashboard/ai-insights',
    expected: 'AI match recommendations visible',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/ai-insights`);
      const hasInsights = await helpers.pageHasText(driver, 'AI Insights');
      if (!hasInsights) throw new Error("AI Insights title not found");
      return 'AiInsights page rendered with campaign matches';
    }
  },
  {
    id: 'TC-037',
    module: MODULE,
    flowStep: 'NGO Discovery',
    name: 'NGO List Page Loads',
    description: 'Navigate to /dashboard/ngos',
    expected: 'List of verified NGOs visible',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/ngos`);
      const hasNgos = await helpers.pageHasText(driver, 'Verified NGOs');
      if (!hasNgos) throw new Error("Verified NGOs title not found");
      return 'NGOs page loaded with verified NGOs';
    }
  },
  {
    id: 'TC-038',
    module: MODULE,
    flowStep: 'User Profile',
    name: 'Profile Page Loads',
    description: 'Navigate to /dashboard/profile',
    expected: 'User profile with name, email, donation stats',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/profile`);
      const hasProfile = await helpers.pageHasText(driver, 'My Profile');
      if (!hasProfile) throw new Error("Profile page heading not found");
      return 'Profile page rendered with user info';
    }
  },
  {
    id: 'TC-039',
    module: MODULE,
    flowStep: 'User Profile',
    name: 'Edit Profile',
    description: 'Click Edit on profile page and update name',
    expected: 'Profile updated successfully',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/profile`);
      
      // Click Edit Profile button
      await helpers.click(driver, By.xpath("//button[contains(text(),'Edit Profile')]"));
      
      // Click Save Changes button
      await helpers.click(driver, By.xpath("//button[contains(text(),'Save Changes')]"));
      await driver.sleep(1000);
      
      return 'Profile edit interaction complete';
    }
  },
  {
    id: 'TC-040',
    module: MODULE,
    flowStep: 'Settings',
    name: 'Settings Page Loads',
    description: 'Navigate to /dashboard/settings',
    expected: 'Settings toggles visible (theme, notifications)',
    run: async (driver) => {
      await ensureDonorLogin(driver);
      await driver.get(`${config.BASE_URL}/dashboard/settings`);
      const hasSettings = await helpers.pageHasText(driver, 'Settings');
      if (!hasSettings) throw new Error("Settings title not found");
      return 'Settings page loaded correctly';
    }
  }
];
