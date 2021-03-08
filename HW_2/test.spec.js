const assert = require('assert');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder().forBrowser('chrome').build();
let url = "http://158.101.173.161";
let login = "testadmin";
let pass = "R8MRDAYT_test";

async function authorization () {
  await driver.findElement(By.name("username")).click()
  await driver.findElement(By.name("username")).sendKeys(login)
  await driver.findElement(By.name("password")).click()
  await driver.findElement(By.name("password")).sendKeys(pass)
  await driver.findElement(By.css(".btn")).click()
}

async function main() {

  let menuItemsLocator = By.className("app");
  let subMenuItemsLocator = By.className("doc");
  let panelHeadingLocator = By.className("panel-heading");

  // url
  await driver.get( url + '/admin/');

  // authorization
  authorization();
  browser.pause(1);
  
  for (let menuIterator = 1; menuIterator <= await driver.findElements(menuItemsLocator).length; menuIterator++){
     
    await driver.findElement(By.css(".doc:nth-child("+menuIterator+") .name")).click()
    await assert(isElementPresent(panelHeadingLocator), "Heading not found")
      
/*       for (int submenuIterator = 1 ; submenuIterator <= driver.findElements(subMenuItemsLocator).size(); submenuIterator++)
      {
          driver.findElement(By.xpath("//li[contains(@class,'doc')]["+submenuIterator+"]")).click();
          Assertions.assertTrue(isElementPresent(panelHeadingLocator), "Heading not found");
      } */
  }
 
}
main();