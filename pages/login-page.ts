import { expect, type Locator, type Page } from '@playwright/test'
import { DashboardPage } from './dashboard-page'

export class LoginPage {

    readonly page: Page
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator
    readonly invalidCredentialsText: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameField = page.locator("//input[@name='username']")
        this.passwordField = page.locator("//input[@name='password']")
        this.loginButton = page.getByRole('button', { name: 'Login'})
        this.invalidCredentialsText = page.getByText('Invalid credentials')
    }

    async goto() {
        await this.page.goto('/web/index.php/auth/login')
    }

    async verifyLoginPage() {
        await expect(this.page).toHaveURL(/\/login$/)
        await expect(this.usernameField).toBeVisible()
    }

    async login(username: string, password: string): Promise<DashboardPage> {
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click()
        return new DashboardPage(this.page)
    }

}