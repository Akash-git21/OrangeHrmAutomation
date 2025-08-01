import {expect, Locator, Page} from '@playwright/test';

export class HeaderServices {
    // variables to store Locators for the dashboard page elements
    readonly page: Page;
    readonly dynamicHeader: Locator;
    readonly userProfileMenu: Locator;
    readonly logoutButton: Locator;

    // constructor to initialize the locators using the provided page
    constructor(page: Page) {
        this.page = page;
        this.dynamicHeader = page.locator('//div[@class="oxd-topbar-header"]//h6');
        this.userProfileMenu = page.locator('//span[@class="oxd-userdropdown-tab"]');
        this.logoutButton = page.locator('//a[text()="Logout"]');
        
    }


    async validateDynamicHeaderText(expectedHeaderText: string) {
        const dynamicHeaderText = await this.dynamicHeader.textContent();
        expect(dynamicHeaderText).toEqual(expectedHeaderText);
        // console.log(dynamicHeaderText);
    }
    /**
     * Validates that the welcome message is displayed correctly.
     */
    async validateProfileName() {
        const profileName = await this.userProfileMenu.locator("p").textContent();
        expect(profileName).toEqual('manda user');
        // console.log(profileName);
    }

    
    /**
     * Logs out of the application by clicking the logout button.
     */
    async logoutAction() {
        await this.userProfileMenu.click();
        await this.logoutButton.click();
    }
}
