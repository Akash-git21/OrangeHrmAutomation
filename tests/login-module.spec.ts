import {test,expect} from "../fixtures/hooks-fixtures";
import invalid_Login_credentials from '../test-data/invalid_login_credentials.json'

test.use({storageState:{
    cookies:[],
    origins:[]
}});

test("To Verify that user is not be able to login with invalid password",async({gotoUrl,loginPage,commonUtils})=>{

    const username= commonUtils.decrypt(process.env.USER_NAME!);
    await loginPage.loginToApplication(username, invalid_Login_credentials.invalidPassword)
    await expect(loginPage.invalidCredentialsMessage).toHaveText(invalid_Login_credentials.invalidCredentialMessage);
    expect(loginPage.usernameInput).toBeVisible();
    console.log("logIn Test");
});

test("To Verify that user is not be able to login with invalid username",async({gotoUrl,loginPage,commonUtils})=>{

    const password= commonUtils.decrypt(process.env.USER_PASS!);
    await loginPage.loginToApplication(invalid_Login_credentials.invalidUsername, password)
    await expect(loginPage.invalidCredentialsMessage).toHaveText(invalid_Login_credentials.invalidCredentialMessage);
    expect(loginPage.usernameInput).toBeVisible();
    console.log("logIn Test");
});

test("To Verify that user is not be able to login with invalid username & password",async({gotoUrl,loginPage,commonUtils})=>{

    await loginPage.loginToApplication(invalid_Login_credentials.invalidUsername, invalid_Login_credentials.invalidPassword)
    await expect(loginPage.invalidCredentialsMessage).toHaveText(invalid_Login_credentials.invalidCredentialMessage);
    expect(loginPage.usernameInput).toBeVisible();
    console.log("logIn Test");
});
