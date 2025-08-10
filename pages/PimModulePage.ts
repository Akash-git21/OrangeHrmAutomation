import { Locator, Page } from "@playwright/test";

export class PimModulePage{

    readonly page: Page;

    readonly addButton: Locator;

    readonly firstName: Locator;

    readonly middleName: Locator;

    readonly lastName: Locator;

    readonly saveButton: Locator;

    readonly newlyCreatedEmpHeading: Locator;

    constructor(page:Page){
        this.page=page;
        this.addButton = page.getByRole('button', { name: ' Add' });

        this.firstName = page.getByPlaceholder('First Name');
        this.middleName = page.getByPlaceholder('Middle Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.saveButton = page.getByText(" Save ");
        this.newlyCreatedEmpHeading = page.locator('.orangehrm-edit-employee-name'); 
    }

    /**
     * this method adds new employee in to the system.
     * @param firstName 
     * @param middleName 
     * @param lastName 
     */
    async addEmployee(firstName: string, middleName: string, lastName: string){
        await this.addButton.click();
        await this.firstName.fill(firstName);
        await this.middleName.fill(middleName);
        await this.lastName.fill(lastName);
        await this.saveButton.click();
    }
}