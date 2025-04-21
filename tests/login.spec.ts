import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'

test('Valid login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.verifyLoginPage()
    await loginPage.login(process.env.USERNAME ?? 'admin', process.env.PASSWORD ?? 'admin123')
    await expect(page).toHaveURL(/\/index$/)
    await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible()
})

test('Invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.verifyLoginPage()
    await loginPage.login('username', 'password')
    await expect(loginPage.invalidCredentialsText).toBeVisible()
})
