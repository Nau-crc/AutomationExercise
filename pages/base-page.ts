import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {

    protected page: Page;
    readonly locator: Locator;



    constructor(page: Page) {
        this.page = page;
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
}