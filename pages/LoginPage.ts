import { expect, Locator, Page } from '@playwright/test';
import * as dotenv from 'dotenv';

export class LoginPage{
    // variables to store Locators for the login page elements
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginHeader: Locator;
    readonly forgotPasswordLink: Locator;
    readonly invalidCredentialsMessage: Locator;

    // constructor to initialize the locators using the provided page
    // and to set up the locators for the login page elements
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('//div[@class="orangehrm-login-slot"]//following-sibling::input[@name="username"]');
        this.passwordInput = page.locator('//div[@class="orangehrm-login-slot"]//following-sibling::input[@name="password"]');
        this.loginButton = page.locator('//div[@class="orangehrm-login-slot"]//following-sibling::button');
        this.loginHeader = page.locator('//h5[text()="Login"]');
        this.forgotPasswordLink = page.locator('//div[@class="orangehrm-login-forgot"]/p');
        this.invalidCredentialsMessage = page.locator('//p[text()="Invalid credentials"]');
    }

    /**
     * Navigates to the login page of the application.
     * This method uses the Playwright page object to go to the specified URL.
     */
    async navigateToLoginPage() {
        await this.page.goto(`${process.env.BASE_URL}web/index.php/auth/login`);
    }

    /**
     * Logs in to the application using the provided username and password.
     * This method fills in the username and password fields and clicks the login button.
     * 
     * @param username - The username to log in with.
     * @param password - The password to log in with.
     */
    async loginToApplication(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
        * Validates that the login header text is correct.
     */
    async validateLoginHeaderText(){
        const pageHeader = await this.loginHeader.textContent();
        expect(pageHeader).toEqual('Login');
        // console.log(pageHeader);
    }
}