const { test, expect, request } = require('@playwright/test');
import APIUtils from '../Utils/APIUtils';

const loginData = {userEmail: "aunwika.ket@gmail.com", userPassword: "Aun123456"}
const createOrderData = {orders: [{country: "Singapore", productOrderedId: "6581ca979fd99c85e8ee7faf"}]};
// let token = "";
// let orderId = "";
let response = {};

test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const APIUtil = new APIUtils(apiContext)
    response = await APIUtil.createOrder(createOrderData, loginData)

    // const responseLogin = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginData})
    
    // console.log(responseLogin.status());
    // expect(responseLogin.ok()).toBeTruthy();
    
    // const responseLoginJson = await responseLogin.json();
    // token = responseLoginJson.token;

    // const responseCreateOrder = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
    //     data: createOrderData,
    //     headers: {
    //         "Authorization": token,
    //         "Content-Type": "application/json"
    //     }
    // });

    // const responseCreateOrderJson = await responseCreateOrder.json();
    // // console.log(responseCreateOrderJson);
    // orderId = responseCreateOrderJson.orders[0];
    // // orderIdFromAPI = responseCreateOrderJson.order[0];
}); 

test.beforeEach(() => {
});


test('login and select adidas', async ({page}) => {
    const email = "aunwika.ket@gmail.com"
    page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, response.token)
    //login
    await page.goto("https://rahulshettyacademy.com/client/");
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").fill("Aun123456");
    // await page.locator("#login").click()

//     // Product page
//     await page.waitForSelector("div.card-body")
//     const products = await page.locator("div.card-body")
//     console.log(products)
//     for(let i=0; i < await products.count(); i++){
//         if(await products.nth(i).locator("b").textContent() === "ADIDAS ORIGINAL"){
//             await products.nth(i).locator("text= Add To Cart").click()
//             break;
//         }
//     }

//     page.locator("div.card-body", { has: page.locator("b:has-text('IPHONE 13 PRO')")}).locator("text= Add To Cart").click()
//     await page.waitForTimeout(5000)
//     //click cart
//     await page. locator("button[routerlink='/dashboard/cart']").click()
//     //change page completely yet?
//     await page.waitForSelector("h3:has-text('ADIDAS ORIGINAL')")
//     //check if adidas is visible
//     // await expect (page.locator("h3:has-text('ADIDAS ORIGINAL')")).toBeVisible()
//     expect (await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()).toBeTruthy() 
//     //chech if iPhone is visible
//     // await expect (page. locator("h3: has-text('IPHONE 13 PRO')")).toBeVisible() 
//     expect (await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible()).toBeTruthy()
//     await page.locator("button.btn-primary:has-text('Checkout')").click()
   
//     //Checkout
//     //type with delay on the text field country -> "in"
//     await page.locator("input[placeholder='Select Country']").pressSequentially("sin", {delay: 300}) 
//     await expect(page.locator("section.ta-results")).toBeVisible();
//     //select target country from the dropdown list -> "Singapore"
//     const dropdownOptions = await page.locator("section.ta-results").locator("button");
// //     for (let i = 0; i < await dropdownOptions.count(); i++) {
// //         if (await dropdownOptions.nth(i).textContent() === " Singapore") {
// //             await dropdownOptions.nth(i).click();
// //             break;
// //     }
// // }
//     await page. locator("section.ta-results").locator("button:has-text(' Singapore')").click() 
//     await expect(page.locator("input[placeholder='Select Country']")).toHaveValue("Singapore");
//     await expect(page.locator("div.user__name label")).toHaveText(email)

//     await page.locator("input.txt").nth(1).fill("123")
//     await page.locator("input.txt").nth(2).fill("tester")
//     await page.locator("a.action__submit").click()

//     //Success Landing page
//     await expect(page.locator("h1.hero-primary")).toBeVisible()

//     const orderID = await page.locator("tr.ng-star-inserted label").first().textContent() 
//     console.log(orderID)
    await page.locator("button[routerlink='/dashboard/myorders']").click()

    //Order History page
    await page.waitForSelector("tbody tr")
    const rows = await page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); i++){
        const rowOrderID = await rows.nth(i).locator("th").textContent() 
        console.log('rowID ' + rowOrderID)
        if(response.orderIdFromAPI.includes(rowOrderID)){
            await rows.nth(i).locator("td button.btn-primary").click() 
            break;
    }
}
    //View Detail page
    await expect(response.orderIdFromAPI).toContain(await page.locator("div.col-text.-main").textContent())

    });

test("getByLabel", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Student").click()

    await page.getByPlaceholder("Password").fill("Password")
    await page.getByRole("button", {name: "Submit"}).click()
    await expect(page.getByText("This is a demo eCommerce web appplication")).toBeVisible()

    await page.getByRole("link", {name: "shop"}).click()
    await expect(page.locator("app-card").filter({hasText: "Samsung Note 8"})).toBeVisible()
    await page.pause()
})

test('go back forward', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()


    // await page.goto("https://playwright.dev/docs/input")
    // await page.goBack()
    // await page.goForward
});

test('now popup', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.locator("#hide-textbox").click()
    // await expect(page.locator("#displayed-text")).toBeHidden()

    // await page.on("dialog", dialog => dialog.accept()) // dismiss()
    // await page.locator("#confirmbtn").click()
    
    // await page.locator("#mousehover").hover()
    // await page.locator("a[href='#top']").click()
    // await page.pause()

    //Switch frames
    const childFrame = page.frameLocator("#courses-iframe")
    await expect(childFrame.locator(".main-header")).toBeVisible()

    await childFrame.locator(".main-menu [href='lifetime-access']").first().click() 
    await page.waitForTimeout (5000)
    let number = await childFrame.locator("div.container-fluid h2").textContent() 
    number = number.split(" ")
    console.log("Number: " + number [1])

});

// test.only('Intercept and Mock Response, No order hietory', async ({page}) => {
//     const email = "aunwika.ket@gmail.com"
//     page.addInitScript(value => {
//         window.localStorage.setItem("token", value)
//     }, response.token)
//     //login
//     await page.goto("https://rahulshettyacademy.com/client/");
   
//     // Click Order History
//     await page.locator("button[routerlink='/dashboard/myorders']").click()

//     //Inter

//     //Expect test when there's no order histor



test.only('Intercept and Mock Response, No order history', async ({page}) => { 
    const email = "aunwika.ket@gmail.com";
    const mockPayload = {data: [], message: "No Orders" };
    await page.addInitScript((value) => {
        window.localStorage.setItem("token", value);
    }, response.token);
    //Dashboard
    await page.goto("https://rahulshettyacademy.com/client/");

    //Intercept & Mock Response of the order history
    //Listenner to events
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/66b991a8ae2afd4c0b47eac8", async (route) => {
        //Mock response here
        const response = await page.request.fetch(route.request());
        route.fulfill({
            response: response,
            body: JSON.stringify(mockPayload),
        });
    });

    //Click Order History page hyperlink
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/66b991a8ae2afd4c0b47eac8");
    
    // Expect text when there's no order history
    await expect(page.getByText(" You have No Orders to show at this time.")).toBeVisible();



//     //Order History page hyper link
//     await page.waitForSelector("tbody tr")
//     const rows = await page.locator("tbody tr");
//     for(let i = 0; i < await rows.count(); i++){
//         const rowOrderID = await rows.nth(i).locator("th").textContent() 
//         console.log('rowID ' + rowOrderID)
//         if(response.orderIdFromAPI.includes(rowOrderID)){
//             await rows.nth(i).locator("td button.btn-primary").click() 
//             break;
//     }
// }
//     //View Detail page
//     await expect(response.orderIdFromAPI).toContain(await page.locator("div.col-text.-main").textContent())

    });