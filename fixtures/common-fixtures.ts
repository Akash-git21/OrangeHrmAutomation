import {test as baseTest} from '../fixtures/page-fixtures';
import CommonUtils from '../utils/CommonUtils';

type CommonFixtures = {
    commonUtils: CommonUtils;
}

export const test= baseTest.extend<CommonFixtures>({
    commonUtils: async ({}, use) => {
        await use(new CommonUtils());
    }
});

