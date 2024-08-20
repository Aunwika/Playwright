const { test, expect } = require('@playwright/test');
const { promises } = require('dns');

test('new tab', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://compendiumdev.co.uk/")

    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), //Listen to new tab event
        page.locator("a[href='https://eviltester.com']").click() //open a new tab
    ]
)

// await page.locator("a[href='https://www.eviltester.com/'").click() 

await expect(page.url()).toBe("https://compendiumdev.co.uk/")
await expect(newPage.url()).toBe("https://www.eviltester.com/aaaddfs")

await newPage.locator("a[href='https://www.eviltester.com/blog/eviltester/devops/some-kubernetes-kubectl-cheat-sheet-notes/']").last().click()
await expect(newPage.url()).toBe("https://www.eviltester.com/blog/eviltester/devops/some-kubernetes-kubectl-cheat-sheet-notes/")

})



test('basic UI', async ({page}) => {
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html")
    await page.locator("#dropdowm-menu-1").selectOption("sql")
    await page.locator("#checkboxes [value='option-1']").check() 
    await page.locator("#checkboxes [value='option-3']"). uncheck()
    await page.locator("#radio-buttons [value='green']").check() 
    await page.locator("#radio-buttons [value='purple']").check()

    //Assertions
    await expect(page.locator("#dropdowm-menu-1")).toHaveValue("sql")
    await expect(page.locator("#checkboxes [value='option-1']")).toBeChecked() 
    await expect(page.locator("#checkboxes [value='option-3']")).not.toBeChecked()
    await expect(page.locator("#radio-buttons [value='green']")).not.toBeChecked() 
    await expect(page.locator("#radio-buttons [value='purple']")).toBeChecked()
    
    // expect(await page.locator("#checkboxes [value='option-1']").isChecked()).toBeFalsy()
    expect(await page.locator("#checkboxes [value='option-3']").isChecked()).toBeFalsy()

    await expect(page.locator("nav[role='navigation']")).toHaveAttribute("class", "navbar navbar-inverse navbar-fixed-top")
 })

test('should fail login with wrong credentials then relogin and pass', async ({page}) => {
    // section login fail
    await page.goto("https://www.saucedemo.com/v1/index.html")
    // await page.locator("#aaaa").click({timeout: 5000})
    await page.locator("input#user-name").fill("username")
    await page.locator("[data-test='password']").fill("password")
    await page.locator("#login-button").click()
    console.log(await page.locator("[data-test='error']").allTextContents())
    await expect(page.locator("[data-test='error']")).toContainText("Username and password do not match")

    //Section login pass
    await page.locator("input#user-name").fill("")
    await page.locator("[data-test='password']").fill("")
    await page.locator("input#user-name").fill("standard_user")
    await page.locator("[data-test='password']").fill("secret_sauce")
    await page.locator("#login-button").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html")

    //Inventory page
    await page.waitForLoadState("networkidle")
    await page.locator(".inventory_item").first().waitFor()

    console.log(await page.locator(".inventory_item").first().textContent())
    console.log(await page.locator(".inventory_item").allTextContents()) //returns -> []
})

test('should fail login without password', async ({page}) => {
    await page.goto("https://www.saucedemo.com/v1/index.html")
    await page.locator("input#user-name").fill("username")
    // await page.locator("[data-test='password']").fill("password")
    await page.locator("#login-button").click()
    await expect(page.locator("[data-test='error']")).toContainText("Password is required")
})

// test('My first test',async() => {
//  await //step1 - open browser
//  await //step2 - enter username
//  await //step3 - enter password
//  await //step4 - click login
// });

// test('My seconde test',async function(){
//  await //step1 - open browser
//  await //step2 - enter username
//  await //step3 - enter password
//  await //step4 - click login
// });

test('My first test', async({page}) => {
//chrome context - cookies, caches, plugins
    await page.goto("https://playwright.dev/")
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright")
    // await page.waitForTimeout(5000);
});

test('My seconde test', async({browser}) => {
//chrome context - cookies, caches, plugins
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://playwright.dev/");
});