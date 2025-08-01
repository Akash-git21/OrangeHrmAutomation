import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HeaderServices } from '../pages/HeaderServices';

type PomFixtures = {
    loginPage: LoginPage;
    headerServices: HeaderServices;
};

export const test= baseTest.extend<PomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    headerServices: async ({ page }, use) => {
        await use(new HeaderServices(page));
    }
});