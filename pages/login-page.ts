import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { expect } from '@playwright/test';

export class LoginPage {

    protected page: Page;
    protected basepage: BasePage;
    readonly singupButton: Locator;
    readonly loginButton: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly inputLogin: Locator;
    readonly signInConfirmation: Locator;
    readonly loginToYourAccount: Locator;
    readonly errorLoginMessage: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basepage = new BasePage(page);
        this.singupButton = page.getByRole('link', { name: ' Signup / Login' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.inputEmail = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.inputPassword = page.getByRole('textbox', { name: 'Password' });
        this.inputLogin = page.getByRole('button', { name: 'Login' });
        this.signInConfirmation = page.getByText('Logged in as GabiTest');
        this.loginToYourAccount = page.getByText('Login to your account');
        this.errorLoginMessage = page.getByText('Your email or password is incorrect!');
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
    }

    async loginCredentials(email: string, password: string) {
        await this.singupButton.click();
        await expect(this.loginToYourAccount).toBeVisible();
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.inputLogin.click();
    }

    async checkSignInConfirmation() {
        await expect(this.signInConfirmation).toBeVisible();
    }

    async checkErrorMessage() {
        const errorLoginMessage = this.page.getByText('Your email or password is incorrect!');
        await expect(this.errorLoginMessage).toBeVisible();
    }

    async logout() {
        await this.logoutButton.click();
        await expect(this.singupButton).toBeVisible();
    }
}