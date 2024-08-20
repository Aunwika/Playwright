const { test, expect } = require('@playwright/test');

test('Add ADIDAS ORIGINAL and ZARA COAT 3 to cart, checkout, and verify order ID', async ({ page }) => {

    // Step 1: Login to the application
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.fill('input[formcontrolname="userEmail"]', 'aunwika.ket@gmail.com');
    await page.fill('input[formcontrolname="userPassword"]', 'Aun123456');
    await page.click('#login');

    // Step 2: Add specific products to the cart
    // Locate and add 'ADIDAS ORIGINAL' to the cart
    const adidasProduct = await page.locator('.card-body b').filter({ hasText: 'ADIDAS ORIGINAL' });
    await adidasProduct.locator('xpath=../../following-sibling::button').click();

    // Locate and add 'ZARA COAT 3' to the cart
    const zaraProduct = await page.locator('.card-body b').filter({ hasText: 'ZARA COAT 3' });
    await zaraProduct.locator('xpath=../../following-sibling::button').click();

    // Go to the cart
    await page.click('[routerlink="/dashboard/cart"]');

    // Step 3: Proceed to checkout
    await page.click('text=Checkout');
    await page.fill('[placeholder="Select Country"]', 'India');
    await page.click('.ta-results button:has-text("India")');
    await page.click('.action__submit');

    // Capture order ID
    const orderId = await page.locator('.order-summary .ng-star-inserted').textContent();

    // Step 4: Verify the order ID in the order history
    await page.click('button:has-text("Orders")');
    await expect(page.locator('tbody')).toContainText(orderId);

    // Optional: Take screenshots at key steps
    await page.screenshot({ path: 'screenshots/after-checkout.png' });

    console.log(`Order ID ${orderId} has been successfully placed and verified.`);
});
