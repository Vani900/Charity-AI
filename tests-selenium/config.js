require('dotenv').config();

module.exports = {
  // ─── App Under Test ───────────────────────────────────────────────────────
  BASE_URL: process.env.BASE_URL || 'http://localhost:5173',

  // ─── Browser Settings ─────────────────────────────────────────────────────
  HEADLESS: process.env.HEADLESS === 'true' || false,
  BROWSER_WIDTH: parseInt(process.env.BROWSER_WIDTH) || 1440,
  BROWSER_HEIGHT: parseInt(process.env.BROWSER_HEIGHT) || 900,

  // ChromeDriver path — update this to your actual installed ChromeDriver location
  CHROMEDRIVER_PATH: process.env.CHROMEDRIVER_PATH ||
    'C:\\Users\\ASUS VIVOBOOK\\.wdm\\drivers\\chromedriver\\win64\\149.0.7827.55\\chromedriver-win64\\chromedriver.exe',

  // ─── Timeouts ─────────────────────────────────────────────────────────────
  IMPLICIT_WAIT: 8000,    // ms — default selenium implicit wait
  PAGE_LOAD: 30000,       // ms — max page load time
  ELEMENT_WAIT: 10000,    // ms — explicit element wait
  API_SETTLE: 1500,       // ms — sleep after navigation for JS rendering

  // ─── Test Credentials ─────────────────────────────────────────────────────
  DONOR_EMAIL: process.env.DONOR_EMAIL || 'selenium_donor@charityai.test',
  DONOR_PASSWORD: process.env.DONOR_PASSWORD || 'Test@1234',
    DONOR_NAME: process.env.DONOR_NAME || 'Selenium Donor',

      NGO_EMAIL: process.env.NGO_EMAIL || 'selenium_ngo@charityai.test',
        NGO_PASSWORD: process.env.NGO_PASSWORD || 'Test@1234',
          NGO_NAME: process.env.NGO_NAME || 'Selenium NGO Partner',

            ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@charityai.test',
              ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'Admin@1234',
};
