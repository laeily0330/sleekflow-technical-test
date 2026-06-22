import { type Page } from "@playwright/test";

// Locator factory for the login flow. This abstracts selector logic away from tests
// so that page structure changes can be managed centrally.
export const loginLocator = (page: Page) => {
    return {
        // Accessible page navigation link to open the login portal.
        // Uses role-based locator chaining for more resilient UI tests.
        loginNavigationButton: page.getByRole('navigation').getByRole('link', { name: 'Log In', exact: true }),

        // Header element used to confirm the login page is rendered.
        loginPageHeader: page.locator('p:has-text("Sign in to continue to SleekFlow")'),
        
        // Primary identifier input, typically email or username.
        // The selector is intentionally specific by ID and name.
        usernameInput: page.locator('input#username[name="username"]'),

        // Continue button for advancing from username entry to password entry.
        continueButton: page.locator('button._button-login-id[data-action-button-primary="true"]'),
        
        // Element showing the verified email or authentication method.
        emailVerificationDisplay: page.locator('span.ulp-authenticator-selector-text'),
        
        // Password input used in the second step of the login flow.
        passwordInput: page.locator('input#password[name="password"]'),

        // Final submit button for password-based sign in.
        signInButton: page.locator('button._button-login-password[data-action-button-primary="true"]'),
        
        // Post-login element for sign-out functionality.
        // Uses alternate selectors to handle different DOM structures.
        signOutButton: page.locator('span.MuiTypography-menu1:has-text("Sign out"), button.MuiTypography-body1:has-text("Sign out")'),

        // Dashboard profile or email display used to verify successful authentication.
        dashboardEmailDisplay: page.locator('p[data-sentry-source-file="MainPanel.tsx"]'),

        // Validation messages for username/email input failures.
        emailInputError: page.locator('#username-error, .ulp-input-error-message, [id*="error-element-username"]'),

        // Global authentication error indicators shown on login failure.
        globalAuthError: page.locator('.ulp-error-description, #error-element-password, .MuiAlert-message')
    };
};