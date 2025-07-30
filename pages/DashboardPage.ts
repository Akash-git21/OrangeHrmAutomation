import {expect, Locator, Page} from '@playwright/test';

export class DashboardPage {
    // variables to store Locators for the dashboard page elements
    readonly page: Page;
    readonly dashboardHeader: Locator;
    readonly userProfileMenu: Locator;
    readonly logoutButton: Locator;

    // constructor to initialize the locators using the provided page
    constructor(page: Page) {
        this.page = page;
        this.dashboardHeader = page.locator('//h6[text()="Dashboard"]');
        this.userProfileMenu = page.locator('//span[@class="oxd-userdropdown-tab"]');
        this.logoutButton = page.locator('//a[text()="Logout"]');
    }

    /**
     * Validates that the welcome message is displayed correctly.
     */
    async validateWelcomeMessage() {
        const message = await this.welcomeMessage.textContent();
        expect(message).toContain('Welcome');
    }

    /**
     * Logs out of the application by clicking the logout button.
     */
    async logout() {
        await this.userProfileMenu.click();
        await this.logoutButton.click();
    }
}