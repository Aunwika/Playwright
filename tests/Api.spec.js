const { test, expect } = require("@playwright/test"); 

test.describe('setup', () => {
    test('authenticate', async ({browser}) => {
    //Login
    const context = await browser.newContext()
    const page = await context.newPage()
    const email = "aunwika.ket@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Aun123456");
    await page.locator("#login").click();
    await page.waitForSelector("div.card-body") // Login complete 
    await context.storageState({path: 'state.json'})
    await context.close()
    });
 });
 test.describe('Bypass Login', () => {
    test.use({storageState: 'state.json' });
    test('Temp', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
});
});