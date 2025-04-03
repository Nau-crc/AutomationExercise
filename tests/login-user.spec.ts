import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page'
import { LoginPage } from '../pages/login-page';

test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo('http://automationexercise.com');
    await basePage.acceptCookies();
});

test.afterEach(async ({ page }) => {   
    const basePage = new BasePage(page);
    await basePage.close();
});

test('login user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.login('test@gabitest.com', 'Test@123');
    await expect(page.getByText('Logged in as GabiTest')).toBeVisible();
});

test('login user with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('iikcwcw@erve.com', 'Test@123');
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});