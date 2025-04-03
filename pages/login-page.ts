import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { expect } from '@playwright/test';

export class LoginPage {

    protected page: Page;
    protected basepage: BasePage;
    readonly singupButton: Locator;
    readonly loginButton: Locator;
    readonly inputLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basepage = new BasePage(page);
        this.singupButton = page.getByRole('link', { name: ' Signup / Login' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.inputLogin = page.getByRole('button', { name: 'Login' });
    }

    private async fillFormField(fieldName: string, value: string) {
        const field = this.page.getByText(fieldName);
        await field.fill(value);
    }

    async login(email: string, password: string) {
        await this.singupButton.click();
        await expect(this.page.getByText('Login to your account')).toBeVisible();
        await this.fillFormField('Email Address', email);
        await this.fillFormField('Password', password);
        await this.inputLogin.click();
    }
}