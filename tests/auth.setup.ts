import { test as setup, expect } from '@playwright/test'
import path from 'path'
import { LoginPage } from '../pages/login-page'

const authFile = path.join(__dirname, '../storage-states/user.json')

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.verifyLoginPage()
    await loginPage.login(process.env.USERNAME ?? 'admin', process.env.PASSWORD ?? 'admin123')
    await expect(page).toHaveURL(/\/index$/)
    await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible()
    await page.context().storageState({ path: authFile })
})