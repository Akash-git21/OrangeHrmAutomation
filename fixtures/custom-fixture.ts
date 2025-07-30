import {test as baseTest} from '@playwright/test';
import CommonUtils from '../utils/CommonUtils';

type CustomFixtures = {
  credentials: { username: string; password: string };
};

export const test = baseTest.extend<CustomFixtures>({
  credentials: async ({}, use) => {
    const utils = new CommonUtils();
    const username = utils.decrypt(process.env.USER_NAME || '');
    const password = utils.decrypt(process.env.PASSWORD || '');
    await use({ username, password });
  }
});