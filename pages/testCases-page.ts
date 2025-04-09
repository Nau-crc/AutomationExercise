import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { expect } from '@playwright/test';

export class TestCasesPage {

    protected page: Page;
    protected basepage: BasePage;

    readonly testCasesButton: Locator;
    readonly testCasesText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.testCasesButton = page.getByRole('link', { name: 'Test Cases' });
        this.testCasesText = page.locator('b');
    }

    async verifyAllTestCaseTitlesVisible() {
        const testCaseTitles = this.page.locator('.panel-title'); 
        const count = await testCaseTitles.count();
        for (let i = 0; i < count; i++) {
            const title = testCaseTitles.nth(i);
            await expect(title).toBeVisible();
        }
        await expect(this.testCasesText).toHaveText('Test Cases');
        await expect(this.page.locator('.panel-title').filter({ hasText: 'Test Case' })).toHaveCount(26);
    }
}