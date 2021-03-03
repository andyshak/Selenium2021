const assert = require('assert')
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

async function authorization (param) {
  // authorization
  await param.findElement(By.name("username")).click()
  await param.findElement(By.name("username")).sendKeys("testadmin")
  await param.findElement(By.name("password")).click()
  await param.findElement(By.name("password")).sendKeys("R8MRDAYT_test")
  await param.findElement(By.css(".btn")).click()
}   

async function catalog() {
  const driver = await new webdriver.Builder()
  .forBrowser('chrome')
  .build();

  // url
  await driver.get('http://158.101.173.161/admin/');

  // authorization
  await authorization(driver);

  await driver.manage().setTimeouts({ implicit: 1000 });
  await driver.findElement(By.css(".app:nth-child(2) .name")).click();
  await driver.wait(until.elementLocated(By.css("div.panel-heading")), 2000);
  let catalog = await driver.findElement(By.css("div.panel-heading")).getText(); 
  
  // verify
  await assert.equal(catalog, "Catalog", "Element doesn't match"); 
  
  await driver.quit();
}

async function attribute () {
  const driver = await new webdriver.Builder()
  .forBrowser('chrome')
  .build();

  // url
  await driver.get('http://158.101.173.161/admin/');

  // authorization
  await authorization(driver);

  await driver.manage().setTimeouts({ implicit: 1000 });
  await driver.findElement(By.css(".app:nth-child(2) .name")).click();
  await driver.manage().setTimeouts({ implicit: 1000 });
  await driver.findElement(By.css(".doc:nth-child(2) a")).click();
  await driver.wait(until.elementLocated(By.css("div.panel-heading")), 2000);
  let attribute = await driver.findElement(By.css("div.panel-heading")).getText(); 
  // verify
  await assert.equal(attribute, "Attribute Groups", "Element doesn't match"); 
  
  await driver.quit();
}

catalog();

attribute();
