import { type Page, type Locator, expect } from '@playwright/test'
import { NavigationMenu } from './navigation-menu'

export class AdminPage {
    readonly page: Page
    readonly navigationMenu: NavigationMenu
    readonly adminHeader: Locator

    constructor(page: Page) {
        this.page = page
        this.navigationMenu = new NavigationMenu(this.page)
        this.adminHeader = page.locator("//h6[text()='Admin']")
    }

    async goto() {
        await this.page.goto('web/index.php/admin/viewSystemUsers')
    }

    async verifyAdminPage() {
        await expect(this.page).toHaveURL(/\/viewSystemUsers$/)
        await expect(this.adminHeader).toBeVisible()
    }
}