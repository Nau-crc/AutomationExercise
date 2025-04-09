import { test } from '@playwright/test';
import { BasePage } from '../pages/base-page'
import { ContactUsPage } from '../pages/contactUs-page';

test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo('http://automationexercise.com');
    await basePage.acceptCookies();
});

test.afterEach(async ({ page }) => {   
    const basePage = new BasePage(page);
    await basePage.close();
});

test ('contactUs', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.fillContactForm('Lau', 'testlau@test.com', 'Test Subject', 'Test Comment');
    await contactUsPage.uploadFile('utils/screenshot.png');
    await contactUsPage.submitFormAndHandlePopup();
    await contactUsPage.checkSuccessMessage();
    await contactUsPage.homeButton.click();
});