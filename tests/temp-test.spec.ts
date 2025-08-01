import {test} from '../fixtures/hooks-fixtures';

test('Test 1', async ({ page,gotoUrl }) => {
    console.log(await page.title());
});

test('Test 2', async ({page,gotoUrl  }) => {
    console.log(await page.title());
});

test('Test 3', async ({ page,gotoUrl,logout }) => {
    console.log(await page.title());
});