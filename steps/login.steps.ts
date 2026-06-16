import { Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { SignUpPage } from '../pages/SignUp/signup.page';
import { LoginPage } from '../pages/Login/login.page';

const { Given, When, Then } = createBdd();
let loginTab: Page; 
const testAccountEmail = 'ridge421@yopmail.com';

When('I navigate to the login tab window', async ({ page }) => {
  // Instantiate the correct page object
  const loginPage = new LoginPage(page);
  
  // Open the new tab using its own isolated method
  loginTab = await loginPage.navigatetoLoginPortal(); 
});

Then('I should see the correct login page header', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.verifyOnLoginPage();
});

When('I enter my registered email address', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.enterUsername(testAccountEmail);
});

When('I click the login continue button', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.clickContinue();
});

Then('I should see my {string} email displayed on the password screen', async ({}, emailText) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.verifyDisplayedEmail(emailText);
});

When('I enter my account password', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.enterPassword('SecurePass123!'); 
});

When('I click the final signin submission button', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.clickSignIn();
});

Then('I should be logged in successfully and see the signout option', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.verifyUserIsLoggedIn();
});

When('I enter an empty email address', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.enterEmptyUsername();
});

Then('I should see an email validation field error message', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.verifyEmailInputErrorVisible();
});

When('I enter an incorrect password {string}', async ({}, wrongPassword) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.enterAnyPassword(wrongPassword);
});

Then('I should see a password authentication error message', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.verifyGlobalAuthErrorVisible();
});

When('I enter an invalid formatted email {string}', async ({}, invalidEmail) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.enterUsername(invalidEmail);
});

When('I enter any account password', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.enterAnyPassword('AnyDummyPassword123!');
});

Then('I should see an invalid user error message', async ({}) => {
  const loginPage = new LoginPage(loginTab);
  await loginPage.verifyGlobalAuthErrorVisible();
});