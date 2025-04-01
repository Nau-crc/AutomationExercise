import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page'
import { RegisterPage } from '../pages/register-page';


test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo('http://automationexercise.com');
    await basePage.acceptCookies();
});

test.afterEach(async ({ page }) => {   
    const basePage = new BasePage(page);
    await basePage.close();
});

test('register user', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.signUpUserFiller();
    await registerPage.registerUserFiller();
    await registerPage.deleteAccount();      
});