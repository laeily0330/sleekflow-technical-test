import { Page } from "@playwright/test";

export const signUpLocator = (page: Page) => ({
    goToSignUp: page.getByRole('navigation').getByRole('link', { name: 'Start for Free' }),
    signUpHeader: page.getByText('Create your account', { exact: true }),
    
    // Form Inputs on the signup page
    emailInput: page.locator('#email'),
    confirmationCheckbox: page.locator('#terms-of-service'),
    continueButton: page.locator('button[data-action-button-primary="true"]'),
    
    //Input Password on the signup page
    emailVerificationDisplay: page.locator('span.ulp-authenticator-selector-text, div.ulp-authenticator-wrapper span').first(),
    passwordInput: page.locator('#password'),
    finalSignUpButton: page.locator('button[data-action-button-primary="true"]'),
    
    // Validation and Errors
    successVerificationMessage: page.locator('span[data-sentry-element="Box"]').filter({ hasText: "We've sent a verification email" }),
    fieldErrorMessage: page.locator('.ulp-input-error-message, .Mui-error, [id*="-error"]'),
    
    // Targets the terms and conditions container alert state
    termsErrorWrapper: page.locator('.ulp-checkbox-error, .MuiFormControl-root')
});
