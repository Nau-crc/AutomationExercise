import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { expect } from '@playwright/test';

export class ProductsPage {

    protected page: Page;
    protected basepage: BasePage;
    readonly productList: Locator;
    readonly productTitles: Locator;
    readonly productListItemViewProductButton: Locator;
    readonly productListItemViewProductName: Locator;
    readonly productListItemViewProductPrice: Locator;
    readonly productListItemViewProductCategory: Locator;
    readonly productListItemViewProductBrand: Locator;
    readonly productListItemViewProductAvailibility: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basepage = new BasePage(page);
        this.productList = page.getByRole('link', { name: 'Products' });
        this.productTitles = page.locator('.productinfo p');
        this.productListItemViewProductButton = page.locator('.choose > .nav > li > a');
        this.productListItemViewProductName = page.getByRole('link', { name: 'Products' }).getByRole('link').filter({ hasText: 'Product Name' });   
        this.productListItemViewProductPrice = page.getByRole('link', { name: 'Products' }).getByRole('link').filter({ hasText: 'Product Price' });
        this.productListItemViewProductCategory = page.getByRole('link', { name: 'Products' }).getByRole('link').filter({ hasText: 'Product Category' });
        this.productListItemViewProductBrand = page.getByRole('link', { name: 'Products' }).getByRole('link').filter({ hasText: 'Product Brand' });
        this.productListItemViewProductAvailibility = page.getByRole('link', { name: 'Products' }).getByRole('link').filter({ hasText: 'Product Availibility' });
    }

    async verifyAllProductTitlesVisible() {
        await this.page.waitForLoadState('networkidle');
        const allTitles = await this.productTitles.allTextContents();
        expect(allTitles.length).toBeGreaterThan(0);
    }
    async viewProductdetails() {
        await this.productListItemViewProductButton.first().click();
        await expect(this.page).toHaveURL(/\/product_details\//);
        await this.productListItemViewProductName.isVisible();
        await this.productListItemViewProductPrice.isVisible();
        await this.productListItemViewProductCategory.isVisible();
        await this.productListItemViewProductBrand.isVisible();
        await this.productListItemViewProductAvailibility.isVisible();
    }

}