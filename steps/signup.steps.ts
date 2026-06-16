import { Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { SignUpPage } from '../pages/SignUp/signup.page';

const { Given, When, Then } = createBdd();
let signupTab: Page; 
let localGeneratedEmail: string;

async function generateTestEmail(): Promise<string> {
  const { faker } = await import('@faker-js/faker');
  const randomWord = faker.word.sample({ length: 2 }); 
  const randomNumber = faker.number.int({ min: 10, max: 99 }); 
  return `qalely${randomNumber}@sleekflow.io`;
}

console.log(generateTestEmail);

Given('I am on the sleekflow homepage', async ({ page }) => {
  const homepage = new SignUpPage(page);
  await homepage.navigate();
});

When('I navigate to the signup tab window', async ({ page }) => {
  const homepage = new SignUpPage(page);
  signupTab = await homepage.navigatetoSignUp(); 
});

// Email Process Actions
When('I enter my email and accept the terms confirmation', async ({}) => {
  const { faker } = await import('@faker-js/faker');
  const signUpPage = new SignUpPage(signupTab);
  localGeneratedEmail = await generateTestEmail();
  console.log(`Generated Positive Test Email: ${localGeneratedEmail}`);

  await signUpPage.enterEmailAndAgree(localGeneratedEmail);
  await signUpPage.acceptTerms();
});

When('I click the first signup button', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.clickInitialSignUp();
});

// Verification Assertion
Then('I should see my correct email displayed on the password screen', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.verifyDisplayedEmail(localGeneratedEmail);
});

// Password Process Actions
When('I enter my secure account password', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.enterPassword('SecurePass123!');
  //console.log(`isi password`);
});

When('I click the final signup submission button', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.clickFinalSignUp();
  //console.log(`klik signup`);
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

When('I enter a valid email address', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  localGeneratedEmail = await generateTestEmail();
  console.log(`[T&C Boundary Flow] Using Email: ${localGeneratedEmail}`);

  await signUpPage.enterEmailOnly(localGeneratedEmail);
});

When('I do not check the terms and conditions checkbox', async ({}) => {
  // Already left unchecked explicitly inside enterEmailOnly() step setup
});

Then('the system should prevent progression and highlight the terms checkbox', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.verifyTermsCheckboxHighlighted();
});