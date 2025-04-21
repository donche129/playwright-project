import { test, expect } from '../fixtures/logged-in-user'
import { DashboardPage } from '../pages/dashboard-page'

test.beforeEach( async ({ loggedInUser }) => {
    console.log('Logged in using fixture')
})

test('Verify dashboard page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.verifyDashboardPage()
})

test('Use nav menu to go to admin page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.verifyDashboardPage()
    const adminPage = await dashboardPage.navigationMenu.goToAdmin()
    await adminPage.verifyAdminPage()
})