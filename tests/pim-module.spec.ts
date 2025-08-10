import {test, expect} from "../fixtures/hooks-fixtures";
import pimData from "../test-data/pim_module_data.json";

test.only('To verfy that the new employee should be created successfully.', async({page,gotoUrl,leftnavMenu,pimPage})=>{
    await leftnavMenu.openPimModule();
    await pimPage.addEmployee(pimData.first_name,pimData.middel_name,pimData.last_name);
    await expect(pimPage.newlyCreatedEmpHeading).toHaveText(`${pimData.first_name} ${pimData.last_name}`);
});