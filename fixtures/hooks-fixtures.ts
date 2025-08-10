import { expect } from '@playwright/test';
import {test as baseTest} from './common-fixtures';

type HooksFixtures = {
    gotoUrl: any;
    logout: any;
}

export const test = baseTest.extend<HooksFixtures>({
    gotoUrl: async ({loginPage},use) => {
        await loginPage.navigateToLoginPage();
        await use();
    },
    logout: async ({headerServices},use) => {
        await use();
        await headerServices.logoutAction();
    }
});

export {expect} from '@playwright/test'; 