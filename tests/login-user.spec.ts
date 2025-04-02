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
        await loginPage.loginCredentials('test@gabitest.com', 'Test@123');
        await loginPage.checkSignInConfirmation();
});

test('login user with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginCredentials('iikcwcw@erve.com', 'Test@123');
    await loginPage.checkErrorMessage();
});