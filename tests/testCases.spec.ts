import { test } from '@playwright/test';
import { BasePage } from '../pages/base-page'
import { TestCasesPage } from '../pages/testCases-page';

test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo('http://automationexercise.com');
    await basePage.acceptCookies();
});

test.afterEach(async ({ page }) => {   
    const basePage = new BasePage(page);
    await basePage.close();
});

test('Verify Test Cases Page', async ({ page }) => {
    const testCasesPage = new TestCasesPage(page);
    const basePage = new BasePage(page);
    await basePage.testCasesClick();
    await testCasesPage.verifyAllTestCaseTitlesVisible();
});