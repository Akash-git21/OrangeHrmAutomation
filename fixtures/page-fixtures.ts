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