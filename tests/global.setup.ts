import {test} from '../fixtures/common-fixtures';
import * as dotenv from 'dotenv';
dotenv.config();

test("Global Setup for Auto Login",async ({page,loginPage ,commonUtils,headerServices}) => { 
    const username:string= commonUtils.decrypt(process.env.USER_NAME!);
    const password:string = commonUtils.decrypt(process.env.USER_PASS!);
    await loginPage.navigateToLoginPage();
    await loginPage.validateLoginHeaderText();
    await loginPage.loginToApplication(username, password);
    await headerServices.validateDynamicHeaderText("Dashboard");
    await page.context().storageState(
        {
            path: './playwright/.auth/auth.json'
        }
    );
});

