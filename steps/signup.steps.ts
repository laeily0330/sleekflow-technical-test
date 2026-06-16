import { Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { SignUpPage } from '../pages/SignUp/signup.page';
//import { faker } from '@faker-js/faker';

const { Given, When, Then } = createBdd();
let signupTab: Page; 
let localGeneratedEmail: string;

// Background Hooks
Given('I am on the sleekflow homepage', async ({ page }) => {
  const homepage = new SignUpPage(page);
  await homepage.navigate();
});

When('I navigate to the signup tab window', async ({ page }) => {
  const homepage = new SignUpPage(page);
  signupTab = await homepage.navigatetoSignUp(); 
});

// Step 1: Email Process Actions
When('I enter my email and accept the terms confirmation', async ({}) => {
  const { faker } = await import('@faker-js/faker');
  // We initialize the SignUpPage directly with our active signup tab context
  const signUpPage = new SignUpPage(signupTab);
  const genericName = faker.word.sample({ length: 5 }); // e.g., "cloud"
  localGeneratedEmail = `${genericName}${faker.string.numeric(3)}@yopmail.com`;
  console.log(localGeneratedEmail);

  await signUpPage.enterEmailAndAgree(localGeneratedEmail);
  //await signUpPage.acceptTerms();
});

When('I click the first signup button', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.clickInitialSignUp();
});

// Step 2: Verification Assertion
Then('I should see my correct email displayed on the password screen', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.verifyDisplayedEmail(localGeneratedEmail);
});

// Step 2: Password Process Actions
When('I enter my secure account password', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.enterPassword('SecurePass123!');
});

When('I click the final signup submission button', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.clickFinalSignUp();
});

// Post-Registration Assertions
Then('the account should be saved successfully', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  
  // Pass the generated email string straight into the validator
  await signUpPage.verifyText(localGeneratedEmail); 
});


//NEGATIVE TEST
When('I enter an invalid email {string}', async ({}, emailInput) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.enterEmailOnly(emailInput);
});

When('I accept the terms confirmation', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.acceptTerms();
});

Then('I should see the error message {string}', async ({}, expectedError) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.verifyErrorMessageText(expectedError);
});

// Scenario: Empty Fields Boundary
When('I leave the email field empty', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.clearEmailField();
});

Then('I should see a field required validation error', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  // Reuses core assertion logic checking for any empty field warning flag text
  await signUpPage.verifyErrorMessageText('Please enter an email address');
});

// Scenario: Missing Terms & Conditions
When('I enter a valid email address', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  const { faker } = await import('@faker-js/faker');
  const tempEmail = `${faker.word.sample({ length: 6 })}@yopmail.com`;
  await signUpPage.enterEmailOnly(tempEmail);
});

When('I do not check the terms and conditions checkbox', async ({}) => {
  // Already left unchecked explicitly inside enterEmailOnly() step setup
});

Then('the system should prevent progression and highlight the terms checkbox', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.verifyTermsCheckboxHighlighted();
});