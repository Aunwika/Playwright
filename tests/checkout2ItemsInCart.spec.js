const { test, expect } = require('@playwright/test');

test('login and select adidas', async ({page}) => {
    const email = "aunwika.ket@gmail.com"
    //login
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Aun123456");
    await page.locator("#login").click()

    // Product page
    await page.waitForSelector("div.card-body")
    const products = await page.locator("div.card-body")
    console.log(products)
    for(let i=0; i < await products.count(); i++){
        if(await products.nth(i).locator("b").textContent() === "ADIDAS ORIGINAL"){
            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }
    }

    page.locator("div.card-body", { has: page.locator("b:has-text('ZARA COAT 3')")}).locator("text= Add To Cart").click()
    await page.waitForTimeout(5000)
    //click cart
    await page. locator("button[routerlink='/dashboard/cart']").click()
    //change page completely yet?
    await page.waitForSelector("h3:has-text('ADIDAS ORIGINAL')")
    //check if adidas is visible
    // await expect (page.locator("h3:has-text('ADIDAS ORIGINAL')")).toBeVisible()
    expect (await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()).toBeTruthy() 
    //chech if iPhone is visible
    // await expect (page. locator("h3: has-text('ZARA COAT 3')")).toBeVisible() 
    expect (await page.locator("h3:has-text('ZARA COAT 3')").isVisible()).toBeTruthy()
    await page.locator("button.btn-primary:has-text('Checkout')").click()
   
    //Checkout
    //type with delay on the text field country -> "in"
    await page.locator("input[placeholder='Select Country']").pressSequentially("sin", {delay: 300}) 
    await expect(page.locator("section.ta-results")).toBeVisible();
    //select target country from the dropdown list -> "Singapore"
    const dropdownOptions = await page.locator("section.ta-results").locator("button");

    await page. locator("section.ta-results").locator("button:has-text(' Singapore')").click() 
    await expect(page.locator("input[placeholder='Select Country']")).toHaveValue("Singapore");
    await expect(page.locator("div.user__name label")).toHaveText(email)
    await page.locator("input.txt").nth(1).fill("123")
    await page.locator("input.txt").nth(2).fill("tester")
    await page.locator("a.action__submit").click()

    //Success Landing page
    await expect(page.locator("h1.hero-primary")).toBeVisible()

    const orderID = await page.locator("tr.ng-star-inserted label").first().textContent() 
    console.log(orderID)
    await page.locator("label[routerlink='/dashboard/myorders']").click()

    //Order History page
    await page.waitForSelector("tbody tr")
    const rows = await page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); i++){
        const rowOrderID = await rows.nth(i).locator("th").textContent() 
        console.log('rowID ' + rowOrderID)
        if(orderID.includes(rowOrderID)){
            await rows.nth(i).locator("td button.btn-primary").click() 
            break;
    }
}
    //View Detail page
    await expect(orderID).toContain(await page.locator("div.col-text.-main").textContent())
    });
