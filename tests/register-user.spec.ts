import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page'
import { RegisterPage } from '../pages/register-page';
import { register } from 'module';


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
    await registerPage.signUpUserFiller('GabiTest', 'gabitest324@gabitest.com');
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    await registerPage.registerUserFiller();
    await registerPage.deleteAccount();      
});

test('register user with existing email', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.signUpUserFiller('GabiTest', 'test@gabitest.com');
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
});