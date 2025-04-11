import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { expect } from '@playwright/test';

export class ContactUsPage {

    protected page: Page;
    protected basepage: BasePage;
    readonly contactUsButton: Locator;
    readonly contactUsForm: Locator;
    readonly inputName: Locator;
    readonly inputEmail: Locator;
    readonly inputSubject: Locator;
    readonly inputComment: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly uploadfile: Locator;
    readonly homeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basepage = new BasePage(page);
        this.contactUsButton = page.getByRole('link', { name: 'Contact us' });
        this.contactUsForm =  page.getByRole('heading', { name: 'Get In Touch' })
        this.inputName = page.getByPlaceholder('Name');
        this.inputEmail = page.getByRole('textbox', { name: 'Email', exact: true });
        this.inputSubject = page.getByPlaceholder('Subject');
        this.inputComment = page.getByRole('textbox', { name: 'Your Message Here' });
        this.uploadfile = page.locator('input[name="upload_file"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have');
        this.homeButton = page.getByRole('link', { name: ' Home' })
    }

    async fillContactForm(name: string, email: string, subject: string, comment: string) {
        await this.contactUsButton.click();
        await expect(this.contactUsForm).toBeVisible();
        await this.inputName.fill(name);
        await this.inputEmail.fill(email);
        await this.inputSubject.fill(subject);
        await this.inputComment.fill(comment);
    }

    async uploadFile(filePath: string) {
        await this.uploadfile.setInputFiles(filePath);
    }

    async submitFormAndHandlePopup() {
    this.page.once('dialog', async (dialog) => {
    console.log('Alerta del navegador:', dialog.message());
    await dialog.accept();
    });

    await this.submitButton.click(
    )}

    async checkSuccessMessage() {
        await expect(this.successMessage).toBeVisible();
    }

}
