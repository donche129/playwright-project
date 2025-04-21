import { test as base, expect, type Page } from '@playwright/test'
import { LoginPage } from '../pages/login-page'

export type Fixtures = {
    loggedInUser: Page
}

export const test = base.extend<Fixtures>({
    loggedInUser: async ({ page }, use ) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.verifyLoginPage()
        await loginPage.login(process.env.USERNAME ?? 'admin', process.env.PASSWORD ?? 'admin123')
        await expect(page).toHaveURL(/\/index$/)
        await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible()
        await use(page)
    }
})

export { expect } from '@playwright/test'