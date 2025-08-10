# E2E Automation Framework Using Playwright with TypeScript

A comprehensive end-to-end automation framework built with Playwright and TypeScript for testing the OrangeHRM application.

## Project Structure

```
OrangeHRM/
├── pages/                          # Page Object Model classes
│   ├── LoginPage.ts               # Login page interactions
│   ├── HeaderServices.ts          # Header and navigation services
│   └── LeftnavMenuPage.ts         # Left navigation menu interactions
├── fixtures/                       # Playwright test fixtures
│   ├── page-fixtures.ts           # Page object fixtures
│   ├── hooks-fixtures.ts          # Test hooks and setup
│   └── common-fixtures.ts         # Common utility fixtures
├── tests/                          # Test specifications
│   ├── login-module.spec.ts       # Login functionality tests
│   └── global.setup.ts            # Global test setup
├── utils/                          # Utility classes
│   └── CommonUtils.ts             # Common utility functions
├── test-data/                      # Test data files
│   └── invalid_login_credentials.json
├── playwright/                     # Playwright configuration
├── playwright-report/              # Test execution reports
├── test-results/                   # Test results and artifacts
└── env-files/                      # Environment configuration
```

## Installation & Setup

### Step 1: Install Playwright
Press `Ctrl + Shift + P` in VS Code and type "playwright", then select **Test: Install Playwright Test** > Click on OK button.

This is the master step to install Playwright and all necessary dependencies.

### Step 2: Project Structure Setup
The framework automatically creates the necessary folder structure:
- `pages/` - Contains Page Object Model classes
- `fixtures/` - Contains Playwright test fixtures
- `tests/` - Contains test specifications
- `utils/` - Contains utility classes
- `test-data/` - Contains test data files

## Page Objects

### 1. LoginPage.ts

The `LoginPage` class encapsulates all interactions with the OrangeHRM login page using Playwright. It provides methods for navigation, login, and validation.

```typescript
import { expect, Locator, Page } from '@playwright/test';
import * as dotenv from 'dotenv';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginHeader: Locator;
    readonly forgotPasswordLink: Locator;
    readonly invalidCredentialsMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('//div[@class="orangehrm-login-slot"]//following-sibling::input[@name="username"]');
        this.passwordInput = page.locator('//div[@class="orangehrm-login-slot"]//following-sibling::input[@name="password"]');
        this.loginButton = page.locator('//div[@class="orangehrm-login-slot"]//following-sibling::button');
        this.loginHeader = page.locator('//h5[text()="Login"]');
        this.forgotPasswordLink = page.locator('//div[@class="orangehrm-login-forgot"]/p');
        this.invalidCredentialsMessage = page.locator('//p[text()="Invalid credentials"]');
    }

    async navigateToLoginPage() {
        await this.page.goto(`${process.env.BASE_URL}web/index.php/auth/login`);
    }

    async loginToApplication(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async validateLoginHeaderText() {
        const pageHeader = await this.loginHeader.textContent();
        expect(pageHeader).toEqual('Login');
    }
}
```

### 2. HeaderServices.ts

The `HeaderServices` class handles header-related interactions including user profile management and logout functionality.

```typescript
import { expect, Locator, Page } from '@playwright/test';

export class HeaderServices {
    readonly page: Page;
    readonly dynamicHeader: Locator;
    readonly userProfileMenu: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dynamicHeader = page.locator('//div[@class="oxd-topbar-header"]//h6');
        this.userProfileMenu = page.locator('//span[@class="oxd-userdropdown-tab"]');
        this.logoutButton = page.locator('//a[text()="Logout"]');
    }

    async validateDynamicHeaderText(expectedHeaderText: string) {
        const dynamicHeaderText = await this.dynamicHeader.textContent();
        expect(dynamicHeaderText).toEqual(expectedHeaderText);
    }

    async validateProfileName() {
        const profileName = await this.userProfileMenu.locator("p").textContent();
        expect(profileName).toEqual('manda user');
    }

    async logoutAction() {
        await this.userProfileMenu.click();
        await this.logoutButton.click();
    }
}
```

### 3. LeftnavMenuPage.ts

The `LeftnavMenuPage` class provides comprehensive navigation functionality for the left sidebar menu, including all 13 menu items from the OrangeHRM application.

**Features:**
- Complete navigation coverage for all menu items
- Advanced automation methods with error handling
- Accessibility testing capabilities
- Visual regression testing framework
- State management and validation

**Menu Items Covered:**
- Search, Admin, PIM, Leave, Time, Recruitment
- My Info, Performance, Dashboard, Directory
- Maintenance, Claim, Buzz

**Key Methods:**
```typescript
// Navigation and interaction
await leftnavMenu.navigateToMenuItem('Admin');
await leftnavMenu.toggleSidebar();

// Validation and state management
await leftnavMenu.validateMenuItemActive('Time');
const isExpanded = await leftnavMenu.isSidebarExpanded();

// Comprehensive testing
const results = await leftnavMenu.performCompleteNavigationTest();
const menuData = await leftnavMenu.getAllMenuItems();

// Advanced testing
const accessibilityIssues = await leftnavMenu.performAccessibilityCheck();
const visualTest = await leftnavMenu.performVisualRegressionTest();
```

## Fixtures

### 1. page-fixtures.ts

Sets up custom Playwright test fixtures for page objects, allowing easy injection into tests.

```typescript
import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HeaderServices } from '../pages/HeaderServices';

type PomFixtures = {
    loginPage: LoginPage;
    headerServices: HeaderServices;
};

export const test = baseTest.extend<PomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    headerServices: async ({ page }, use) => {
        await use(new HeaderServices(page));
    }
});
```

### 2. hooks-fixtures.ts

Provides test hooks for common setup and teardown operations.

```typescript
import { test as baseTest } from './common-fixtures';

type HooksFixtures = {
    gotoUrl: any;
    logout: any;
}

export const test = baseTest.extend<HooksFixtures>({
    gotoUrl: async ({ loginPage }, use) => {
        await loginPage.navigateToLoginPage();
        await use();
    },
    logout: async ({ headerServices }, use) => {
        await use();
        await headerServices.logoutAction();
    }
});
```

### 3. common-fixtures.ts

Extends the base test with common utility fixtures.

```typescript
import { test as baseTest } from '../fixtures/page-fixtures';
import CommonUtils from '../utils/CommonUtils';

type CommonFixtures = {
    commonUtils: CommonUtils;
}

export const test = baseTest.extend<CommonFixtures>({
    commonUtils: async ({}, use) => {
        await use(new CommonUtils());
    }
});
```

## Utilities

### CommonUtils.ts

Provides encryption and decryption utilities for secure handling of sensitive test data.

```typescript
import cryptoJs from 'crypto-js';

export default class CommonUtils {
    private secretKey: string;
    
    constructor() {
        if (process.env.SECRET_KEY) {
            this.secretKey = process.env.SECRET_KEY;
        } else {
            throw new Error('Error: SecretKey is undefined. Please set the SECRET_KEY environment variable.');
        }
    }

    public encrypt(data: string): string {
        const encryptedData = cryptoJs.AES.encrypt(data, this.secretKey).toString();
        return encryptedData;
    }

    public decrypt(encryptedData: string): string {
        const decryptedData = cryptoJs.AES.decrypt(encryptedData, this.secretKey).toString(cryptoJs.enc.Utf8);
        return decryptedData;
    }
}
```

## Test Data

### invalid_login_credentials.json

Contains test data for invalid login scenarios.

```json
{
    "invalidUsername": "Admin1",
    "invalidPassword": "Admin@123",
    "invalidCredentialMessage": "Invalid credentials"
}
```

## Test Examples

### Login Module Tests

```typescript
import { test, expect } from "../fixtures/hooks-fixtures";
import invalid_Login_credentials from '../test-data/invalid_login_credentials.json';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

test("To Verify that user is not be able to login with invalid password", async ({ gotoUrl, loginPage, commonUtils }) => {
    const username = commonUtils.decrypt(process.env.USER_NAME!);
    await loginPage.loginToApplication(username, invalid_Login_credentials.invalidPassword);
    await expect(loginPage.invalidCredentialsMessage).toHaveText(invalid_Login_credentials.invalidCredentialMessage);
    expect(loginPage.usernameInput).toBeVisible();
});

test("To Verify that user is not be able to login with invalid username", async ({ gotoUrl, loginPage, commonUtils }) => {
    const password = commonUtils.decrypt(process.env.USER_PASS!);
    await loginPage.loginToApplication(invalid_Login_credentials.invalidUsername, password);
    await expect(loginPage.invalidCredentialsMessage).toHaveText(invalid_Login_credentials.invalidCredentialMessage);
    expect(loginPage.usernameInput).toBeVisible();
});
```

## Framework Features

### Advanced Automation Capabilities
- **Page Object Model**: Well-structured, maintainable page objects
- **Fixture System**: Flexible test setup and teardown
- **Data Encryption**: Secure handling of sensitive test data
- **Comprehensive Navigation**: Full coverage of application navigation
- **Accessibility Testing**: Built-in accessibility validation
- **Visual Testing**: Framework for visual regression testing
- **Error Handling**: Robust error handling and validation
- **TypeScript**: Strong typing for better code quality

### Best Practices Implemented
- **Separation of Concerns**: Clear separation between pages, fixtures, and utilities
- **Reusability**: Common methods and utilities for repeated operations
- **Maintainability**: Well-documented code with JSDoc comments
- **Scalability**: Easy to extend with new page objects and test scenarios
- **Security**: Encrypted handling of sensitive test data

## Environment Setup

Ensure the following environment variables are set:
- `BASE_URL`: Base URL for the OrangeHRM application
- `SECRET_KEY`: Secret key for encryption/decryption
- `USER_NAME`: Encrypted username for testing
- `USER_PASS`: Encrypted password for testing

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/login-module.spec.ts

# Run tests in headed mode
npx playwright test --headed

# Generate test report
npx playwright show-report
```

This framework demonstrates professional automation practices and provides a solid foundation for comprehensive end-to-end testing of the OrangeHRM application.

