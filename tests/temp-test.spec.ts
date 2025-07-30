import {test, expect} from '../fixtures/combined-fixtures';
// Import CommonUtils from its module (update the path as needed)
import  CommonUtils  from '../utils/CommonUtils';

test('Login Page Test', async ({ page, loginPage }) => {

    // console.log(process.env.BASE_URL);
    // console.log(process.env.USER_NAME);
    // console.log(process.env.PASSWORD);
    // // Navigate to the login page
    // await loginPage.navigateToLoginPage();
    // await page.waitForLoadState('networkidle');
    // // Validate the login header text
    // await loginPage.validateLoginHeaderText();

    // // Perform login with valid credentials
    // await loginPage.loginToApplication('Admin', 'admin123');

    // Optionally, you can add assertions to verify successful login
    // For example, checking if a specific element is visible after login

    const commonUtils = new CommonUtils();
    commonUtils.encrypt('admin123');
});