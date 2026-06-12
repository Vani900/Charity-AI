require('dotenv').config();
const path = require('path');

// Target APK location
const APK_PATH = path.join(__dirname, '..', 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');

module.exports = {
  // Appium Server Connection Settings
  APPIUM_HOST: process.env.APPIUM_HOST || '127.0.0.1',
  APPIUM_PORT: parseInt(process.env.APPIUM_PORT || '4723', 10),
  APPIUM_PATH: process.env.APPIUM_PATH || '/', // default for Appium 2.x

  // Android Capabilities
  CAPABILITIES: {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
    'appium:app': APK_PATH,
    'appium:appPackage': 'com.charitychain.ai',
    'appium:appActivity': 'com.charitychain.ai.MainActivity',
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 240,
    'appium:ensureWebviewsHavePages': true,
    'appium:chromedriverAutodownload': true
  },

  // Target local server from Android emulator point of view
  // 10.0.2.2 refers to host machine's localhost from inside the Android virtual machine
  BASE_URL: process.env.MOBILE_BASE_URL || 'http://10.0.2.2:5173',

  // Simulation Mode toggle
  SIMULATE: process.env.SIMULATE === 'true' || false,

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
