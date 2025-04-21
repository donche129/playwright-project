import { type Page, type Locator, expect } from '@playwright/test'
import { NavigationMenu } from './navigation-menu'

export class DashboardPage {
    readonly page: Page
    readonly navigationMenu: NavigationMenu
    readonly dashboardHeader: Locator

    constructor(page: Page) {
        this.page = page
        this.navigationMenu = new NavigationMenu(this.page)
        this.dashboardHeader = page.locator("//h6[text()='Dashboard']")
    }

    async goto() {
        this.page.goto('/web/index.php/dashboard/index')
    }

    async verifyDashboardPage() {
        await expect(this.page).toHaveURL(/\/index$/)
        await expect(this.dashboardHeader).toBeVisible()
    }
}