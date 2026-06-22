import { Page } from "@playwright/test";

// Locator factory for the signup flow.
// Centralizes selectors so the page object can access a consistent set of UI handles.
export const signUpLocator = (page: Page) => ({
    // Main navigation entry point for the signup flow.
    goToSignUp: page.getByRole('navigation').getByRole('link', { name: 'Start for Free' }),

    // Page header used to assert the signup screen is loaded.
    signUpHeader: page.getByText('Create your account', { exact: true }),
    
    // Core signup form inputs.
    emailInput: page.locator('#email'),
    confirmationCheckbox: page.locator('#terms-of-service'),
    continueButton: page.locator('button[data-action-button-primary="true"]'),
    
    // Password entry step selectors.
    // Handles cases where the email verification display may be nested inside different wrapper elements.
    emailVerificationDisplay: page.locator('span.ulp-authenticator-selector-text, div.ulp-authenticator-wrapper span').first(),
    passwordInput: page.locator('#password'),
    finalSignUpButton: page.locator('button[data-action-button-primary="true"]'),
    
    // Validation and error messaging selectors.
    successVerificationMessage: page.locator('span[data-sentry-element="Box"]').filter({ hasText: "We've sent a verification email" }),
    fieldErrorMessage: page.locator('.ulp-input-error-message, .Mui-error, [id*="-error"]'),
    
    // Terms and conditions validation wrapper, useful for checkbox boundary assertions.
    termsErrorWrapper: page.locator('.ulp-checkbox-error, .MuiFormControl-root')
});
