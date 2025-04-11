import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {

    protected page: Page;
    readonly locator: Locator;

    readonly testCasesButton: Locator;
    readonly productsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.testCasesButton = page.getByRole('link', { name: ' Test Cases' });
        this.productsButton =  page.getByRole('link', { name: ' Products' });
    }

    async close() {
        await this.page.close();
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
        await this.acceptCookies();
        await expect(this.page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
    }

    async acceptCookies() {
        const acceptCookies = this.page.getByRole('button', { name: 'Consent' });

        if (await acceptCookies.isVisible()) {
        await acceptCookies.click();
        }
    }

    async testCasesClick() {
        await this.testCasesButton.click();
        await expect(this.page.locator('b')).toBeVisible();
    }

    async productsClick() {
        await this.productsButton.click();
        await expect(this.page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    }


}