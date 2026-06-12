require('dotenv').config();

module.exports = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:5173',
  HEADLESS: process.env.HEADLESS === 'true' || false, // default false so the execution is visible, can be set to true in CI
  CHROMEDRIVER_PATH: 'C:\\Users\\ASUS VIVOBOOK\\.wdm\\drivers\\chromedriver\\win64\\149.0.7827.55\\chromedriver-win64\\chromedriver.exe',
  
  // Test Credentials
  DONOR_EMAIL: process.env.DONOR_EMAIL || 'selenium_donor@charityai.test',
  DONOR_PASSWORD: process.env.DONOR_PASSWORD || 'Test@1234',
  DONOR_NAME: process.env.DONOR_NAME || 'Selenium Donor',
  
  NGO_EMAIL: process.env.NGO_EMAIL || 'selenium_ngo@charityai.test',
  NGO_PASSWORD: process.env.NGO_PASSWORD || 'Test@1234',
  NGO_NAME: process.env.NGO_NAME || 'Selenium NGO',
  
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@charityai.test',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'Admin@1234'
};
