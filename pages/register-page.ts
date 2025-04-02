import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { expect } from '@playwright/test';

export class RegisterPage {

    protected page: Page;
    protected basepage: BasePage;
    readonly singupButton: Locator;
    readonly registerButton: Locator;
    readonly inputName: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly inputDay: Locator;
    readonly inputMonth: Locator;
    readonly inputYear: Locator;
    readonly inputNewsletter: Locator;
    readonly inputSpecialOffers: Locator;
    readonly inputFirstName: Locator;
    readonly inputLastName: Locator;
    readonly inputCompany: Locator;
    readonly inputAddress: Locator;
    readonly inputCountry: Locator;
    readonly inputState: Locator;
    readonly inputCity: Locator;
    readonly inputZipcode: Locator;
    readonly inputMobile: Locator;
    readonly inputCreateAccount: Locator;
    readonly inputDeleteAccount: Locator;
    readonly continueButton: Locator;
    readonly inputSignup: Locator;
    readonly inputLogin: Locator;
    readonly enterAccountInformation: Locator;
    readonly accountCreatedConfirmationText: Locator;
    readonly accountDeletedConfirmation: Locator;
    readonly signInConfirmation: Locator;


    constructor(page: Page) {
        this.page = page;
        this.basepage = new BasePage(page);
        this.singupButton = page.getByRole('link', { name: ' Signup / Login' });
        this.registerButton = page.getByRole('button', { name: 'Signup' });
        this.inputName = page.getByRole('textbox', { name: 'Name' });
        this.inputEmail = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        
        this.inputPassword = page.getByRole('textbox', { name: 'Password *' });
        this.inputDay = page.locator('#days');
        this.inputMonth = page.locator('#months');
        this.inputYear = page.locator('#years');
        this.inputNewsletter = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.inputSpecialOffers = page.getByRole('checkbox', { name: 'Receive special offers from' });
        this.inputFirstName = page.getByRole('textbox', { name: 'First name *' });
        this.inputLastName = page.getByRole('textbox', { name: 'Last name *' });
        this.inputCompany = page.getByRole('textbox', { name: 'Company', exact: true });
        this.inputAddress = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.inputCountry = page.getByLabel('Country *');
        this.inputState = page.getByRole('textbox', { name: 'State *' });
        this.inputCity = page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.inputZipcode = page.locator('#zipcode');
        this.inputMobile = page.getByRole('textbox', { name: 'Mobile Number *' });
        this.inputCreateAccount = page.getByRole('button', { name: 'Create Account' });
        this.inputDeleteAccount = page.getByRole('link', { name: ' Delete Account' });
        this.continueButton = page.getByRole('link', { name: 'Continue' });
        this.enterAccountInformation = page.getByText('Enter Account Information');
        this.accountCreatedConfirmationText = page.getByText('ACCOUNT CREATED!');
        this.signInConfirmation = page.getByText('Logged in as GabiTest');
        this.accountDeletedConfirmation = page.getByText('ACCOUNT DELETED!');
        
    }
    async signUpUserFiller() {

        await this.singupButton.click();
        await this.inputName.fill('GabiTest');
        await this.inputEmail.fill('gabitest324@gabitest.com');
        await this.registerButton.click();  
        await expect(this.enterAccountInformation).toBeVisible();

    }

    async registerUserFiller() {
        await this.inputPassword.fill('Test@123');
        await this.inputDay.selectOption('1');
        await this.inputMonth.selectOption('1');
        await this.inputYear.selectOption('2000');
        await this.inputNewsletter.check();
        await this.inputSpecialOffers.check();
        await this.inputFirstName.fill('GabiFirstName');
        await this.inputLastName.fill('GabiLastName');
        await this.inputCompany.fill('GabiCompany');
        await this.inputAddress.fill('GabiAddress');
        await this.inputCountry.selectOption('Singapore');
        await this.inputState.fill('Westminster system');
        await this.inputCity.fill('Singapore');
        await this.inputZipcode.fill('999077');
        await this.inputMobile.fill('12345678');
        await this.inputCreateAccount.click();
        await expect(this.accountCreatedConfirmationText).toBeVisible();
        await this.continueButton.click();
        await expect(this.signInConfirmation).toBeVisible();
    }

    async deleteAccount() {
        await this.inputDeleteAccount.click();
        await expect(this.accountDeletedConfirmation).toBeVisible();
        await this.continueButton.click();
    }
}