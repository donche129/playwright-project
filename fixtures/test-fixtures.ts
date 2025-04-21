import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { DashboardPage } from '../pages/dashboard-page'

export type TestFixtures = {
    loginPage: LoginPage
    dashboardPage: DashboardPage
}

export const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await use(loginPage)
    },
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page)
        await dashboardPage.goto()
        await use(dashboardPage)
    }
})

export { expect } from '@playwright/test'