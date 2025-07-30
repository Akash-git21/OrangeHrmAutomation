E2E Automation FrameWork Using PlayWright with typscript....

Open Folder in VS Code in which you want to start a Project.

Step 1: Press Ctrl + Shift + P and type playwright and select Test: Install Playwright Test > Click on ok button.

Step 1 is the master step to install Playwright.

Step 2: Create a new Folder in the project root and name it as "pages".

Step 3: Create a new file in the "pages" folder and name it as "loginPage.ts".

Step 4: Add the following code to "loginPage.ts":

---

### LoginPage.ts

This file defines a `LoginPage` class that encapsulates all interactions with the OrangeHRM login page using Playwright. It uses locators to identify page elements and provides methods to navigate, log in, and validate the login header.

```typescript
import { expect, Locator, Page } from '@playwright/test';

export class LoginPage{
    // variables to store Locators for the login page elements
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginHeader: Locator;
    readonly forgotPasswordLink: Locator;

    // constructor to initialize the locators using the provided page
    // and to set up the locators for the login page elements
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('//div[@class="orangehrm-login-slot"]//following-sibling::input[@name="username"]');
        this.passwordInput = page.locator('//div[@class="orangehrm-login-slot"]//following-sibling::input[@name="password"]');
        this.loginButton = page.locator('//div[@class="orangehrm-login-slot"]//following-sibling::button');
        this.loginHeader = page.locator('//div[@class="orangehrm-login-slot"]//following-sibling::h5)');
        this.forgotPasswordLink = page.locator('//div[@class="orangehrm-login-forgot"]/p');
    }

    /**
     * Navigates to the login page of the application.
     * This method uses the Playwright page object to go to the specified URL.
     */
    async navigateToLoginPage() {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
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
    }
}
```

---

### page-fixtures.ts

This fixture file sets up a custom Playwright test fixture for the `LoginPage` class. It allows you to inject the `loginPage` object into your tests, making it easier to use the page object model in your test cases.

```typescript
import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type PomFixtures = {
    loginPage: LoginPage;
};

export const test= baseTest.extend<PomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});
```

- The `PomFixtures` type defines the shape of the fixture.
- The `loginPage` fixture creates a new instance of `LoginPage` for each test, passing in the Playwright `page` object.
- Use this fixture in your tests to access.
