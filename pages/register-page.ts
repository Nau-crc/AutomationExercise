import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { expect } from '@playwright/test';

export class RegisterPage {
    protected page: Page;
    protected basepage: BasePage;
    readonly signupButton: Locator;
    readonly registerButton: Locator;
    readonly inputFields: Record<string, Locator>;
    readonly checkboxes: Record<string, Locator>;
    readonly selectFields: Record<string, Locator>;
    readonly confirmationTexts: Record<string, Locator>;
    readonly buttons: Record<string, Locator>;
    readonly inputDeleteAccount: Locator;  // Asegúrate de tener este locator
    readonly accountDeletedConfirmation: Locator;  // Asegúrate de tener este locator
    readonly continueButton: Locator;  // Asegúrate de tener este locator

    constructor(page: Page) {
        this.page = page;
        this.basepage = new BasePage(page);
        this.signupButton = page.getByRole('link', { name: ' Signup / Login' });
        this.registerButton = page.getByRole('button', { name: 'Signup' });

        this.inputFields = {
            name: page.getByRole('textbox', { name: 'Name' }),
            email: page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address'),
            password: page.getByRole('textbox', { name: 'Password *' }),
            firstName: page.getByRole('textbox', { name: 'First name *' }),
            lastName: page.getByRole('textbox', { name: 'Last name *' }),
            company: page.getByRole('textbox', { name: 'Company', exact: true }),
            address: page.getByRole('textbox', { name: 'Address * (Street address, P.' }),
            state: page.getByRole('textbox', { name: 'State *' }),
            city: page.getByRole('textbox', { name: 'City * Zipcode *' }),
            zipcode: page.locator('#zipcode'),
            mobile: page.getByRole('textbox', { name: 'Mobile Number *' })
        };

        this.checkboxes = {
            newsletter: page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }),
            specialOffers: page.getByRole('checkbox', { name: 'Receive special offers from' })
        };

        this.selectFields = {
            day: page.locator('#days'),
            month: page.locator('#months'),
            year: page.locator('#years'),
            country: page.getByLabel('Country *')
        };

        this.confirmationTexts = {
            enterAccountInfo: page.getByText('Enter Account Information'),
            accountCreated: page.getByText('ACCOUNT CREATED!'),
            loggedIn: page.getByText('Logged in as GabiTest'),
            accountDeleted: page.getByText('ACCOUNT DELETED!')
        };

        this.buttons = {
            createAccount: page.getByRole('button', { name: 'Create Account' }),
            deleteAccount: page.getByRole('link', { name: ' Delete Account' }),
            continue: page.getByRole('link', { name: 'Continue' })
        };

        // Asegúrate de que estos elementos estén correctamente definidos:
        this.inputDeleteAccount = page.locator('selector_del_boton_de_eliminar_cuenta');  // Asegúrate de que el selector sea el correcto
        this.accountDeletedConfirmation = page.getByText('ACCOUNT DELETED!');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    async signUpUser(name: string, email: string) {
        await this.signupButton.click();
        await this.inputFields.name.fill(name);
        await this.inputFields.email.fill(email);
        await this.registerButton.click();  
        await expect(this.confirmationTexts.enterAccountInfo).toBeVisible();
    }

    async registerUser(password: string, birthDate: { day: string, month: string, year: string }, firstName: string, lastName: string, company: string, address: string, state: string, city: string, zipcode: string, mobile: string, country: string) {
        await this.inputFields.password.fill(password);
        await this.selectFields.day.selectOption(birthDate.day);
        await this.selectFields.month.selectOption(birthDate.month);
        await this.selectFields.year.selectOption(birthDate.year);
        await this.checkboxes.newsletter.check();
        await this.checkboxes.specialOffers.check();

        await this.inputFields.firstName.fill(firstName);
        await this.inputFields.lastName.fill(lastName);
        await this.inputFields.company.fill(company);
        await this.inputFields.address.fill(address);
        await this.inputFields.state.fill(state);
        await this.inputFields.city.fill(city);
        await this.inputFields.zipcode.fill(zipcode);
        await this.inputFields.mobile.fill(mobile);

        await this.selectFields.country.selectOption(country);

        await this.buttons.createAccount.click();
        await expect(this.confirmationTexts.accountCreated).toBeVisible();
        await this.buttons.continue.click();
        await expect(this.confirmationTexts.loggedIn).toBeVisible();
    }

    async deleteAccount() {
        await this.inputDeleteAccount.click();
        await expect(this.accountDeletedConfirmation).toBeVisible();
        await this.continueButton.click();
    }
}
