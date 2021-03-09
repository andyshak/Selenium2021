const assert = require('assert');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

    const pref = new webdriver.logging.Preferences();
    pref.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.DEBUG);


const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setLoggingPrefs(pref)
  .build();

const url = "http://158.101.173.161";
const login = "testadmin";
const pass = "R8MRDAYT_test";
let elements = [
  ".row:nth-child(1) .fa" ,
  ".required:nth-child(1) .fa",
  ".row:nth-child(2) > .form-group:nth-child(2) .fa",
  "a:nth-child(2) > .fa",
  ".row:nth-child(5) > .form-group:nth-child(1) .fa",
  ".row:nth-child(5) > .form-group:nth-child(2) .fa",
  ".col-md-4:nth-child(1) .fa",
  ".col-md-4:nth-child(2) .fa",
  ".form-group:nth-child(3) .fa"
]

async function authorization () {
  await driver.findElement(By.name("username")).click()
  await driver.findElement(By.name("username")).sendKeys(login)
  await driver.findElement(By.name("password")).click()
  await driver.findElement(By.name("password")).sendKeys(pass)
  await driver.findElement(By.css(".btn")).click()
}

async function openWindow(elem){
  await driver.manage().logs().get(webdriver.logging.Type.BROWSER).then(function(entries) {
    console.log(entries);
  });

  await driver.findElement(By.css(elem)).click()
  let tabs = await driver.getAllWindowHandles()
  await driver.sleep(1000)
  await driver.switchTo().window(tabs[1]);
  await driver.close();
  await driver.switchTo().window(tabs[0]);

  await driver.manage().logs().get(webdriver.logging.Type.BROWSER).then(function(entries) {
    console.log(entries.level);
  });
} 

async function main () {
  await driver.get( url + '/admin/');
  await authorization();
  await driver.sleep(2000)
  await driver.get( url + '/admin/?app=countries&doc=countries');

  await driver.findElement(By.linkText("Poland")).click()

  for(let i = 0; i < elements.length; i++){
    await openWindow(elements[i]);
  }

  await driver.quit();

  

}

main();