import { test } from '@playwright/test';
import { BasePage } from '../pages/base-page';
import { RegisterPage } from '../pages/register-page';

test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo('http://automationexercise.com');
});

test.afterEach(async ({ page }) => {   
    const basePage = new BasePage(page);
    await basePage.close();
});

test('register user', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    const userData = {
        name: 'GabiTest',
        email: 'gabitest324@gabitest.com',
        password: 'Test@123',
        birthDate: { day: '1', month: '1', year: '2000' },
        firstName: 'GabiFirstName',
        lastName: 'GabiLastName',
        company: 'GabiCompany',
        address: 'GabiAddress',
        country: 'Singapore',
        state: 'Westminster system',
        city: 'Singapore',
        zipcode: '999077',
        mobile: '12345678',
    };

    // Llamar a registerUser pasando cada campo por separado
    await registerPage.signUpUser(userData.name, userData.email);
    await registerPage.registerUser(
        userData.password, 
        userData.birthDate, 
        userData.firstName, 
        userData.lastName, 
        userData.company, 
        userData.address, 
        userData.country, 
        userData.state, 
        userData.city, 
        userData.zipcode, 
        userData.mobile
    );
    await registerPage.deleteAccount();
});
