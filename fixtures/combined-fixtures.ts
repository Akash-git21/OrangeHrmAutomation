import { test as pageFixture } from './page-fixtures';
import { test as customFixture } from './custom-fixture';
import { expect } from '@playwright/test';

function mergeTests<T1, T2>(test1: typeof pageFixture, test2: typeof customFixture) {
  return test1.extend<T2>(test2._fixtures);
}

// ✅ Combined test = merged pageFixture + customFixture
export const test = mergeTests(pageFixture, customFixture);
export { expect };
