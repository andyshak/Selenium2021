const assert = require('assert');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
function getRandom(max) {
  let value = Math.floor(Math.random() * Math.floor(max))
  if(value > 0){
    return value;
  } else {
    return 1;
  }
}

const driver = new webdriver.Builder().forBrowser('chrome').build(); 

let url = "http://158.101.173.161";

// url
driver.get(url);
driver.manage().window().maximize();

async function addProduct () {
  let productColumn = await driver.findElements(By.css("#box-popular-products .product-column"))
  let randomProduct = await getRandom(productColumn.length)
  await driver.findElement(By.css("#box-popular-products .product-column:nth-child("+ randomProduct + ")")).click()
  await driver.wait(until.elementLocated(By.name("add_cart_product"), 1000)).click();
}

async function main() {

  for(let i = 0; i < 4; i++) {
    await addProduct ()
    await driver.sleep(1500)
    await driver.get(url);
    await driver.sleep(1000)
  }

  await driver.findElement(By.css("#cart")).click()
  await driver.sleep(1000)

  let items = await driver.findElements(By.css(".item"));
  for(let i = 0; i < items.length; i++) {
    if(await driver.findElement(By.css(".item:nth-child(1) .col-sm-4 > div > div .fa")).isDisplayed()){
      await driver.sleep(500)
      await driver.findElement(By.css(".item:nth-child(1) .col-sm-4 > div > div .fa")).click()
    }
  }

  let text = await driver.wait(until.elementLocated(By.css("p")), 1000).getText();

  assert.equal(text, "There are no items in your cart.")

  await driver.quit();
}

main()
