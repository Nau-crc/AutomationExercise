import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page'
import { ProductsPage } from '../pages/products-page';

test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo('http://automationexercise.com');
    await basePage.acceptCookies();
});

test.afterEach(async ({ page }) => {   
    const basePage = new BasePage(page);
    await basePage.close();
});

test('verify All Product Titles Visible', async ({ page }) => {
    const basePage = new BasePage(page);
    const productsPage = new ProductsPage(page);
    await basePage.productsClick();
    await productsPage.verifyAllProductTitlesVisible();
});

test ('verify All Product Details Visible', async ({ page }) => {
    const basePage = new BasePage(page);
    const productsPage = new ProductsPage(page);
    await basePage.productsClick();
    await productsPage.viewProductdetails();
}
);

