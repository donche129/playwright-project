import { Locator, type Page } from '@playwright/test'
import { DashboardPage } from './dashboard-page'
import { AdminPage } from './admin-page'

export class NavigationMenu {
    readonly page: Page
    readonly dashboardLink: Locator
    readonly adminLink: Locator
    
    constructor(page: Page) {
        this.page = page
        this.dashboardLink = page.locator("//span[text()='Dashboard']")
        this.adminLink = page.locator("//span[text()='Admin']")
    }

    async goToDashboard(): Promise<DashboardPage> {
        await this.dashboardLink.click()
        await this.page.waitForURL(/\/index$/)
        return new DashboardPage(this.page)
    }

    async goToAdmin(): Promise<AdminPage> {
        await this.adminLink.click()
        await this.page.waitForURL(/\/viewSystemUsers/)
        return new AdminPage(this.page)
    }

}