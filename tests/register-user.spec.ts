import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('http://automationexercise.com');
    const acceptCookies = page.getByRole('button', { name: 'Consent' });

    if (await acceptCookies.isVisible()) {
    await acceptCookies.click();
    }
});

test.afterEach(async ({ page }) => {        
    await page.close();
});

test('register user', async ({ page }) => {
    //Signup User
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('GabiTest');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('gabitest2@gabitest.com');
    await page.getByRole('button', { name: 'Signup' }).click();  
    await expect(page.getByText('Enter Account Information')).toBeVisible();

    //Register Form
    await page.getByRole('radio', { name: 'Mrs.' }).check();
    await page.getByRole('textbox', { name: 'Password *' }).fill('Test@123');
    await page.locator('#days').selectOption('1');
    await page.locator('#months').selectOption('1');
    await page.locator('#years').selectOption('2000');
    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    await page.getByRole('textbox', { name: 'First name *' }).fill('GabiFirstName');
    await page.getByRole('textbox', { name: 'Last name *' }).fill('GabiLastName');
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill('GabiCompany');
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('GabiAddress');
    await page.getByLabel('Country *').selectOption('Singapore');
    await page.getByRole('textbox', { name: 'State *' }).fill('Westminster system');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Singapore');
    await page.locator('#zipcode').fill('999077');
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('12345678');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page.getByText('Logged in as GabiTest')).toBeVisible();
    
    //Delete account
    await page.getByRole('link', { name: ' Delete Account' }).click();
    await page.getByRole('link', { name: 'Continue' }).click();      
});