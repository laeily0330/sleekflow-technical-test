import { type Page } from "@playwright/test";

export const loginLocator = (page: Page) => {
    return {
        // Navigation button on the SleekFlow homepage to open the login portal
        loginNavigationButton: page.getByRole('navigation').getByRole('link', { name: 'Log In', exact: true }),
        loginPageHeader: page.locator('p:has-text("Sign in to continue to SleekFlow")'),
        
        // Identification Input Fields & Actions
        usernameInput: page.locator('input#username[name="username"]'),
        continueButton: page.locator('button._button-login-id[data-action-button-primary="true"]'),
        
        // Reuses the identical class we successfully identified in the signup flow!
        emailVerificationDisplay: page.locator('span.ulp-authenticator-selector-text'),
        
        // Credentials Input & Actions
        passwordInput: page.locator('input#password[name="password"]'),
        signInButton: page.locator('button._button-login-password[data-action-button-primary="true"]'),
        
        // Verify login page
        signOutButton: page.locator('span.MuiTypography-menu1:has-text("Sign out"), button.MuiTypography-body1:has-text("Sign out")'),
        dashboardEmailDisplay: page.locator('p[data-sentry-source-file="MainPanel.tsx"]'),

        // Validation and Errors
        emailInputError: page.locator('#username-error, .ulp-input-error-message, [id*="error-element-username"]'),
        globalAuthError: page.locator('.ulp-error-description, #error-element-password, .MuiAlert-message')
    };
};