const { Builder, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function test() {
  console.log("Starting driver debug with custom path...");
  
  const chromeDriverPath = 'C:\\Users\\ASUS VIVOBOOK\\.wdm\\drivers\\chromedriver\\win64\\149.0.7827.55\\chromedriver-win64\\chromedriver.exe';
  const service = new chrome.ServiceBuilder(chromeDriverPath);

  const options = new chrome.Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--headless=new');
  
  console.log("Building driver instance...");
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .setChromeService(service)
    .build();
    
  console.log("Driver instance built successfully.");
  await driver.quit();
  console.log("Driver quit successfully.");
}
test().catch(err => console.error("Error occurred:", err));
