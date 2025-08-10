import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HeaderServices } from '../pages/HeaderServices';
import { LeftnavMenuPage } from '../pages/LeftnavMenuPage';
import { PimModulePage } from '../pages/PimModulePage';

type PomFixtures = {
    loginPage: LoginPage;
    headerServices: HeaderServices;
    leftnavMenu: LeftnavMenuPage;
    pimPage: PimModulePage;
};

export const test= baseTest.extend<PomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    headerServices: async ({ page }, use) => {
        await use(new HeaderServices(page));
    },

    leftnavMenu: async ({page},use)=>{
        await use(new LeftnavMenuPage(page));
    },

    pimPage: async({page},use)=>{
        await use(new PimModulePage(page));
    }
});