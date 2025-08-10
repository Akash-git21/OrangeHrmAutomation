import { expect, Locator, Page } from '@playwright/test';

export class LeftnavMenuPage {
    // variables to store Locators for the left navigation menu elements
    readonly page: Page;
    
    // Logo and branding
    readonly orangeHRMLogo: Locator;
    readonly sidebarToggleButton: Locator;
    
    // Main navigation menu items
    readonly searchMenuItem: Locator;
    readonly adminMenuItem: Locator;
    readonly pimMenuItem: Locator;
    readonly leaveMenuItem: Locator;
    readonly timeMenuItem: Locator;
    readonly recruitmentMenuItem: Locator;
    readonly myInfoMenuItem: Locator;
    readonly performanceMenuItem: Locator;
    readonly dashboardMenuItem: Locator;
    readonly directoryMenuItem: Locator;
    readonly maintenanceMenuItem: Locator;
    readonly claimMenuItem: Locator;
    readonly buzzMenuItem: Locator;
   
    // Constructor to initialize the locators using the provided page
    constructor(page: Page) {
        this.page = page;
        
        // Logo and branding
        this.orangeHRMLogo = page.locator('//div[@class="oxd-brand-banner"]//img[@alt="client brand banner"]');
        this.sidebarToggleButton = page.locator('//button[@class="oxd-icon-button oxd-main-menu-button"]');
        
        // Main navigation menu items with robust selectors
        this.searchMenuItem = page.getByPlaceholder("Search");
        this.adminMenuItem = page.getByRole('link',{name: 'Admin'});
        this.pimMenuItem = page.getByRole('link', { name: 'PIM' });
        this.leaveMenuItem = page.getByRole('link',{name:'Leave'});
        this.timeMenuItem = page.getByRole('link',{name:'Time'});
        this.recruitmentMenuItem = page.getByRole('link',{name:'Recruitment'});
        this.myInfoMenuItem = page.getByRole('link',{name:'My Info'});
        this.performanceMenuItem = page.getByRole('link',{name:'Performance'});
        this.dashboardMenuItem = page.getByRole('link',{name:'Dashboard'});
        this.directoryMenuItem = page.getByRole('link',{name:'Directory'});
        this.maintenanceMenuItem = page.getByRole('link',{name:'Maintenance'});
        this.claimMenuItem = page.getByRole('link',{name:'Claim'});
        this.buzzMenuItem = page.getByRole('link', { name: 'Buzz' });
        
    }


    async openPimModule(){
        await this.pimMenuItem.click();
    }

//     /**
//      * Toggles the sidebar between expanded and collapsed states
//      * This method demonstrates advanced UI interaction handling
//      */
//     async toggleSidebar() {
//         await this.sidebarToggleButton.click();
//         // Wait for animation to complete
//         await this.page.waitForTimeout(300);
//     }

//     /**
//      * Navigates to a specific menu item by clicking on it
//      * This method includes error handling and validation
//      * 
//      * @param menuItem - The menu item to navigate to
//      */
//     async navigateToMenuItem(menuItem: string) {
//         try {
//             const menuLocator = this.getMenuLocator(menuItem);
//             await menuLocator.waitFor({ state: 'visible', timeout: 10000 });
//             await menuLocator.click();
            
//             // Validate navigation by checking if the menu item is now active
//             await this.validateMenuItemActive(menuItem);
            
//             // Wait for page load
//             await this.page.waitForLoadState('networkidle');
//         } catch (error) {
//             throw new Error(`Failed to navigate to ${menuItem}: ${error}`);
//         }
//     }

//     /**
//      * Gets the appropriate locator for a given menu item
//      * This method demonstrates dynamic locator selection
//      * 
//      * @param menuItem - The menu item name
//      * @returns The corresponding locator
//      */
//     private getMenuLocator(menuItem: string): Locator {
//         const menuMap: { [key: string]: Locator } = {
//             'Search': this.searchMenuItem,
//             'Admin': this.adminMenuItem,
//             'PIM': this.pimMenuItem,
//             'Leave': this.leaveMenuItem,
//             'Time': this.timeMenuItem,
//             'Recruitment': this.recruitmentMenuItem,
//             'My Info': this.myInfoMenuItem,
//             'Performance': this.performanceMenuItem,
//             'Dashboard': this.dashboardMenuItem,
//             'Directory': this.directoryMenuItem,
//             'Maintenance': this.maintenanceMenuItem,
//             'Claim': this.claimMenuItem,
//             'Buzz': this.buzzMenuItem
//         };
        
//         if (!menuMap[menuItem]) {
//             throw new Error(`Invalid menu item: ${menuItem}`);
//         }
        
//         return menuMap[menuItem];
//     }

//     /**
//      * Validates that a specific menu item is currently active/selected
//      * This method demonstrates advanced assertion techniques
//      * 
//      * @param menuItem - The menu item to validate
//      */
//     async validateMenuItemActive(menuItem: string) {
//         const menuLocator = this.getMenuLocator(menuItem);
//         await expect(menuLocator.locator('..')).toHaveClass(/active/);
//     }

//     /**
//      * Gets all available menu items and their states
//      * This method demonstrates data extraction and analysis
//      * 
//      * @returns Array of menu items with their properties
//      */
//     async getAllMenuItems() {
//         const menuItems = await this.page.locator('//ul[@class="oxd-main-menu"]//li//span').allTextContents();
//         const menuStates = await this.page.locator('//ul[@class="oxd-main-menu"]//li').all();
        
//         const menuData: Array<{name: string, isActive: boolean, isVisible: boolean}> = [];
//         for (let i = 0; i < menuItems.length; i++) {
//             const classAttribute = await menuStates[i].locator('..').getAttribute('class');
//             const isActive = classAttribute ? classAttribute.includes('active') : false;
//             const isVisible = await menuStates[i].isVisible();
            
//             menuData.push({
//                 name: menuItems[i],
//                 isActive: isActive,
//                 isVisible: isVisible
//             });
//         }
        
//         return menuData;
//     }

//     /**
//      * Performs a comprehensive navigation test across all menu items
//      * This method demonstrates end-to-end testing capabilities
//      */
//     async performCompleteNavigationTest() {
//         const menuItems = ['Dashboard', 'Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info', 'Performance', 'Directory', 'Maintenance', 'Claim', 'Buzz'];
//         const results: Array<{menuItem: string, status: string, timestamp: string, error?: string}> = [];
        
//         for (const menuItem of menuItems) {
//             try { 
//                 await this.navigateToMenuItem(menuItem);
//                 results.push({ menuItem, status: 'PASS', timestamp: new Date().toISOString() });
                
//                 // Add a small delay between navigations to avoid overwhelming the application
//                 await this.page.waitForTimeout(500);
//             } catch (error) {
//                 results.push({ menuItem, status: 'FAIL', error: (error as Error).message, timestamp: new Date().toISOString() });
//             }
//         }
        
//         return results;
//     }

//     /**
//      * Validates the sidebar branding and logo
//      * This method demonstrates UI validation techniques
//      */
//     async validateSidebarBranding() {
//         await expect(this.orangeHRMLogo).toBeVisible();
//         await expect(this.orangeHRMLogo).toHaveAttribute('alt', 'orangehrm-logo');
        
//         // Validate logo dimensions if needed
//         const logoBox = await this.orangeHRMLogo.boundingBox();
//         expect(logoBox?.width).toBeGreaterThan(0);
//         expect(logoBox?.height).toBeGreaterThan(0);
//     }

//     /**
//      * Checks if the sidebar is in collapsed or expanded state
//      * This method demonstrates state detection capabilities
//      * 
//      * @returns True if sidebar is expanded, false if collapsed
//      */
//     async isSidebarExpanded(): Promise<boolean> {
//         try {
//             // Check if the sidebar has expanded state by looking for visible menu text
//             const firstMenuItem = await this.searchMenuItem.isVisible();
//             return firstMenuItem;
//         } catch {
//             return false;
//         }
//     }

//     /**
//      * Performs accessibility testing on the navigation menu
//      * This method demonstrates advanced testing techniques
//      */
//     async performAccessibilityCheck() {
//         const accessibilityIssues: string[] = [];
        
//         // Check for proper ARIA labels
//         const menuItems = await this.page.locator('//ul[@class="oxd-main-menu"]//li//a').all();
//         for (const item of menuItems) {
//             const ariaLabel = await item.getAttribute('aria-label');
//             const role = await item.getAttribute('role');
            
//             if (!ariaLabel && !role) {
//                 accessibilityIssues.push('Missing ARIA attributes');
//             }
//         }
        
//         // Check keyboard navigation
//         await this.page.keyboard.press('Tab');
//         const focusedElement = await this.page.locator(':focus');
//         if (await focusedElement.count() === 0) {
//             accessibilityIssues.push('Keyboard navigation not working');
//         }
        
//         return accessibilityIssues;
//     }

//     /**
//      * Waits for the navigation menu to be fully loaded
//      * This method demonstrates proper wait strategies
//      */
//     async waitForMenuToLoad() {
//         await this.page.waitForSelector('//ul[@class="oxd-main-menu"]', { state: 'visible' });
//         await this.page.waitForLoadState('domcontentloaded');
        
//         // Additional wait for any dynamic content
//         await this.page.waitForTimeout(1000);
//     }

//     /**
//      * Gets the current active menu item
//      * This method demonstrates state extraction
//      * 
//      * @returns The name of the currently active menu item
//      */
//     async getCurrentActiveMenuItem(): Promise<string> {
//         const activeMenuItem = await this.page.locator('//ul[@class="oxd-main-menu"]//li[contains(@class, "active")]//span').first();
//         return await activeMenuItem.textContent() || 'None';
//     }

//     /**
//      * Performs a visual regression test on the sidebar
//      * This method demonstrates advanced visual testing capabilities
//      * Note: Requires additional setup for visual testing
//      */
//     async performVisualRegressionTest() {
//         // This would typically involve taking screenshots and comparing them
//         // For now, we'll implement a basic structure
//         const sidebarElement = this.page.locator('//nav[@class="oxd-sidepanel"]');
        
//         // Ensure sidebar is visible and properly positioned
//         await expect(sidebarElement).toBeVisible();
        
//         // Check if sidebar has proper styling
//         const sidebarBox = await sidebarElement.boundingBox();
//         expect(sidebarBox?.x).toBeGreaterThanOrEqual(0);
//         expect(sidebarBox?.y).toBeGreaterThanOrEqual(0);
        
//         return {
//             status: 'PASS',
//             message: 'Sidebar visual elements are properly positioned and visible'
//         };
//     }
}
