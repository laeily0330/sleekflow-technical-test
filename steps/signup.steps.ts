import { Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { SignUpPage } from '../pages/SignUp/signup.page';

// BDD step binder from playwright-bdd.
const { Given, When, Then } = createBdd();

// Shared reference for the signup popup tab.
let signupTab: Page;
let localGeneratedEmail: string;

async function generateTestEmail(): Promise<string> {
  const { faker } = await import('@faker-js/faker');
  const randomWord = faker.word.sample({ length: 2 });
  const randomNumber = faker.number.int({ min: 10, max: 99 });
  return `qalely${randomNumber}@sleekflow.io`;
}

// Debug helper logged at module load time; not required for step execution.
console.log(generateTestEmail);

Given('I am on the sleekflow homepage', async ({ page }) => {
  const homepage = new SignUpPage(page);

  // Navigate to the public landing page before starting the signup flow.
  await homepage.navigate();
});

When('I navigate to the signup tab window', async ({ page }) => {
  const homepage = new SignUpPage(page);

  // Signup opens in a new popup/tab, so store that Page object for later steps.
  signupTab = await homepage.navigatetoSignUp();
});

// Email entry and terms acceptance for the happy path.
When('I enter my email and accept the terms confirmation', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  localGeneratedEmail = await generateTestEmail();
  console.log(`Generated Positive Test Email: ${localGeneratedEmail}`);

  // Fill the email field and accept terms in two separate actions.
  await signUpPage.enterEmailAndAgree(localGeneratedEmail);
  await signUpPage.acceptTerms();
});

When('I click the first signup button', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);

  // Continue from the email step into the next form stage.
  await signUpPage.clickInitialSignUp();
});

Then('I should see my correct email displayed on the password screen', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);

  // Validate the email is carried into the password verification screen.
  await signUpPage.verifyDisplayedEmail(localGeneratedEmail);
});

// Password entry and submission.
When('I enter my secure account password', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);

  // Use the same password across the signup flow for test consistency.
  await signUpPage.enterPassword('SecurePass123!');
});

When('I click the final signup submission button', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);

  // Submit the final signup form after password input.
  await signUpPage.clickFinalSignUp();
});

Then('the account should be saved successfully', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);

  // Confirm the success notification contains the dynamic email.
  await signUpPage.verifyText(localGeneratedEmail);
});

// Negative path: invalid email format.
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

  // Validate the specific error text for invalid email input.
  await signUpPage.verifyErrorMessageText(expectedError);
});

// Scenario: empty email boundary validation.
When('I leave the email field empty', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  await signUpPage.clearEmailField();
});

Then('I should see a field required validation error', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);

  // Reuse the generic field error assertion to validate required field behavior.
  await signUpPage.verifyErrorMessageText('Please enter an email address');
});

When('I enter a valid email address', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);
  localGeneratedEmail = await generateTestEmail();
  console.log(`[T&C Boundary Flow] Using Email: ${localGeneratedEmail}`);

  // Enter a valid email but intentionally do not check the terms checkbox.
  await signUpPage.enterEmailOnly(localGeneratedEmail);
});

When('I do not check the terms and conditions checkbox', async ({}) => {
  // This is intentionally left blank because the unchecked state is already established.
});

Then('the system should prevent progression and highlight the terms checkbox', async ({}) => {
  const signUpPage = new SignUpPage(signupTab);

  // Verify form submission was blocked by checking the continue button remains visible.
  await signUpPage.verifyTermsCheckboxHighlighted();
});