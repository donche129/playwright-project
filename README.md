# Playwright Sample Project
This is a sample playwright project showcasing the page object model and test fixtures. All information sourced from https://playwright.dev/docs/intro

The test application will be https://opensource-demo.orangehrmlive.com

## Setup
Requires node/npm installed.
To setup locally run `npm install`

## Running Tests
To run tests use:
`npx playwright test`

Further test running commands can be found at https://playwright.dev/docs/running-tests

## Dependencies
typescript
ts-node (optional)
playwright - test framework to run e2e UI & API tests
allure-playwright - to generate test reports
dotenv - to configure environment variables

## Playwright Configuration
When installing playwright via `npm init playwright@latest` a default playwright config is generated along with some sample tests.
These sample tests are located in `/tests-examples`
The playwright config has been modified with some additions:
- Uncommented dotenv imports and config to read from .env file
- Set test directory (default `./tests`)
- Set number of retries (optional)
- Set number of workers (optional)
- Use baseURL from process.env
- Set browser project settings for viewport size, screenshots, video, and trace
- Configure session storage state path (optional)

## Environment variables configuration
The .env file in the root will store `BASEURL`, `USERNAME`, and `PASSWORD`

## Application Page Object Model
In the `/pages` directory each page of the application is represented by a page class.

Each page class contains:
- `Page` interface from Playwright to drive the browser.
- `Locator` object fields for each element that will be interacted with.
- Methods representing actions that can be taken on the page.

Examples of a login page, dashboard page, and admin page are included.
An example is also included of a navigation menu class shared by other pages.

## Test files
Each test file (recognized by ending with `.spec.ts`) represents tests for a particular page.

Each test file will include:
- The `test` and `expect` functions imported from playwright to define tests and assertions.
- Import for any page object associated with the test file.

Generally, the tests will use the `page` instance from the `test` function to drive the browser, use the relevant page object to perform actions, then use `expect` for assersions.

## Fixtures
Playwright allows us to use fixtures to avoid repeat steps in tests that require similar setup. These are located in `/fixtures`

For example the `logged-in-user.ts` fixture extends the `test` function from playwright to include a setup workflow to log the user into the application before executing the test steps.
Test files can then import this `test` function instead of the default playwright `test` function to skip logging in for each test. This avoids having to repeat code for example in a test.beforeEach function in every test file in the repo.

Another example is the generic `test-fixtures.ts` file which will also allow the use of any page object as a test fixture to avoid repeat declarations of page objects in tests.

## Session Storage
Session storage can be configured in the playwright config file to also avoid logging in within each test.

You can add a new `setup` browser project that the other browser projects depend on.
This will ensure the project runs before other browser projects. When run, it can initiate a specific test file that will perform the setup (logging in) then save the state with:
`await page.context().storageState({ path: authFilePath });`

This will store the logged in state. Then in the playwright configuration you can set the `storageState` property of the other browser projects to point to the saved state file.

## API Tests
Example tests for a sample API is also included. The sample API being used is https://reqres.in
These tests use the `request` parameter from the Playwright `test` function. It provides an APIRequestContext that can be used to define request parameters (header, auth, body, etc.) and capture ressponses.
The responses can then be asserted on to verify response codes, body, etc.
