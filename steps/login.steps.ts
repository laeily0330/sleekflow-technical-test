import { Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { SignUpPage } from '../pages/SignUp/signup.page';
import { LoginPage } from '../pages/Login/login.page';

// Playwright BDD wrapper providing Given / When / Then step bindings.
const { Given, When, Then } = createBdd();

// Shared reference to the popup browser tab opened by the login flow.
let loginTab: Page;

// Hard-coded test email for positive login scenarios.
const testAccountEmail = 'lely0330@gmail.com';

When('I navigate to the login tab window', async ({ page }) => {
  // Use the LoginPage object to perform navigation abstractions.
  const loginPage = new LoginPage(page);

  // Capture the popup tab because the login page opens in a new browser context.
  loginTab = await loginPage.navigatetoLoginPortal();
});

Then('I should see the correct login page header', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Verify the login UI is rendered before interacting with the form.
  await loginPage.verifyOnLoginPage();
});

When('I enter my registered email address', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Fill the username/email field using the login page's typed action.
  await loginPage.enterUsername(testAccountEmail);
});

When('I click the login continue button', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Advance from identity input to password entry.
  await loginPage.clickContinue();
});

Then('I should see my {string} email displayed on the password screen', async ({}, emailText) => {
  const loginPage = new LoginPage(loginTab);

  // Validate the email shown on the next screen matches the provided value.
  await loginPage.verifyDisplayedEmail(emailText);
});

When('I enter my account password', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Fill the password field with a valid credential for the happy path.
  await loginPage.enterPassword('SecurePass123!');
});

When('I click the final signin submission button', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Submit the password and trigger authentication.
  await loginPage.clickSignIn();
});

Then('I should be logged in successfully and see the signout option', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Assert that login completed by verifying an authenticated route is reached.
  await loginPage.verifyUserIsLoggedIn();
});

When('I enter an empty email address', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Test the empty-field validation path explicitly.
  await loginPage.enterEmptyUsername();
});

Then('I should see an email validation field error message', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Validate the client-side or rendered error messaging.
  await loginPage.verifyEmailInputErrorVisible();
});

When('I enter an incorrect password {string}', async ({}, wrongPassword) => {
  const loginPage = new LoginPage(loginTab);

  // Enter a wrong password to verify authentication failure behavior.
  await loginPage.enterAnyPassword(wrongPassword);
});

Then('I should see a password authentication error message', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Check for server-side or UI authentication error presentation.
  await loginPage.verifyGlobalAuthErrorVisible();
});

When('I enter an invalid formatted email {string}', async ({}, invalidEmail) => {
  const loginPage = new LoginPage(loginTab);

  // Use the same username input method for invalid formatting validation.
  await loginPage.enterUsername(invalidEmail);
});

When('I enter any account password', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Enter any password to proceed with invalid user path.
  await loginPage.enterAnyPassword('AnyDummyPassword123!');
});

Then('I should see an invalid user error message', async ({}) => {
  const loginPage = new LoginPage(loginTab);

  // Confirm invalid credentials are handled by the app.
  await loginPage.verifyGlobalAuthErrorVisible();
});