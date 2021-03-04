const assert = require('assert');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

async function main() {
  const driver = await new webdriver.Builder()
  .forBrowser('chrome')
  .build();

  // url
  await driver.get('http://158.101.173.161/admin/');

  // authorization
  await driver.findElement(By.name("username")).click()
  await driver.findElement(By.name("username")).sendKeys("testadmin")
  await driver.findElement(By.name("password")).click()
  await driver.findElement(By.name("password")).sendKeys("R8MRDAYT_test")
  await driver.findElement(By.css(".btn")).click()
  
  // step #1 - catalog
  await driver.sleep(3000).then(function() {
    driver.findElement(By.css(".app:nth-child(2) .name")).click();
  });
  await driver.wait(until.elementLocated(By.css(".doc:nth-child(2) .name")), 2000);
  let catalog = await driver.findElement(By.css("div.panel-heading")).getText();
  
  // verify
  await assert.equal(catalog, "Catalog", "Element doesn't match"); 


  // step #2 - attribute
  await driver.sleep(1000).then(function() {
    driver.findElement(By.css(".doc:nth-child(2) .name")).click()
  });
  await driver.wait(until.elementLocated(By.css(".doc:nth-child(2) .name")), 2000);
  let attribute = await driver.findElement(By.css("div.panel-heading")).getText();
  
  // verify
  await assert.equal(attribute, "Attribute Groups", "Element doesn't match"); 

  
  // step #3 - manufacturers
  await driver.sleep(1000).then(function() {
    driver.findElement(By.css(".doc:nth-child(3) .name")).click()
  });
  await driver.wait(until.elementLocated(By.css(".doc:nth-child(3) .name")), 2000);
  let manufacturers = await driver.findElement(By.css("div.panel-heading")).getText();
  
  // verify
  await assert.equal(manufacturers, "Manufacturers", "Element doesn't match"); 


  // step #4 - suppliers
  await driver.sleep(1000).then(function() {
    driver.findElement(By.css(".doc:nth-child(4) .name")).click()
  });
  await driver.wait(until.elementLocated(By.css(".doc:nth-child(3) .name")), 2000);
  let suppliers = await driver.findElement(By.css("div.panel-heading")).getText();
  
  // verify
  await assert.equal(suppliers, "suppliers", "Element doesn't match"); 

  await driver.quit();
}
main();