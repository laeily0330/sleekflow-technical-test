import { expect, type Page } from "@playwright/test";
import { BasePage } from "../base.pages";
import { loginLocator } from "./login.locator";

// Page object for login-related user journeys.
// Encapsulates actions and verifications so test flows remain readable and maintainable.
export class LoginPage extends BasePage {
    readonly element: ReturnType<typeof loginLocator>;
    
    constructor(page: Page) {
        super(page);
        // Initialize locators once and reuse them across all methods.
        this.element = loginLocator(page);
    }

    async clickLoginNav() {
        // Click the navigation link that opens the login portal.
        await this.element.loginNavigationButton.click();
    }

    async navigatetoLoginPortal(): Promise<Page> {
        // Wait for the popup event because the login portal opens in a new tab.
        const pagePromise = this.page.waitForEvent('popup');
        
        // Trigger the popup by clicking the login link in the page navigation.
        await this.page.getByRole('navigation').getByRole('link', { name: 'Log In' }).click();
        
        // Resolve the new popup tab and wait until it finishes loading.
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        
        return newTab;
    }

    async verifyOnLoginPage() {
        // Explicitly wait for the unique login header text to become visible.
        await this.element.loginPageHeader.waitFor({ state: 'visible', timeout: 10000 });
        
        // Confirm the username input is rendered and available for typing.
        await expect(this.element.usernameInput).toBeVisible();
    }

    async enterUsername(username: string) {
        // Fill the username/email field with the test credential.
        await this.element.usernameInput.fill(username);
    }

    async clickContinue() {
        // Move from the identity step to the password step.
        await this.element.continueButton.click();
    }

    async verifyDisplayedEmail(expectedEmail: string) {
        // Wait for the email verification display to appear before asserting its text.
        await this.element.emailVerificationDisplay.waitFor({ state: 'visible', timeout: 5000 });
        const text = await this.element.emailVerificationDisplay.textContent();
        expect(text?.trim()).toBe(expectedEmail);
    }

    async enterPassword(password: string) {
        // Ensure the password input is visible before entering a secret.
        await this.element.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.passwordInput.fill(password);
    }

    async clickSignIn() {
        // Submit the password entry to authenticate the user.
        await this.element.signInButton.click();
    }

    async verifyUserIsLoggedIn() {
        // Use a regular expression to support multiple valid post-login routes.
        const authorizedRoutes = /register-company|onboarding\/ai-checklist|inbox/i;
        
        // Playwright will poll the URL until one of the expected routes is reached.
        await expect(this.page).toHaveURL(authorizedRoutes, { timeout: 15000 });
    }

    // Clears the username field to test empty input validation explicitly.
    async enterEmptyUsername() {
        await this.element.usernameInput.fill('');
    }

    // Helper method to fill any password string, used for negative or parameterized tests.
    async enterAnyPassword(password: string) {
        await this.element.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.passwordInput.fill(password);
    }

    async verifyEmailInputErrorVisible() {
        // First, check native browser validation state for the username input.
        const isEmptyVisible = await this.element.usernameInput.evaluate((input: HTMLInputElement) => !input.checkValidity());
        if (!isEmptyVisible) {
            // If native validation isn't exposed, fall back to the rendered UI error message.
            await this.element.emailInputError.waitFor({ state: 'visible', timeout: 5000 });
            await expect(this.element.emailInputError).toBeVisible();
        }
    }

    async verifyGlobalAuthErrorVisible() {
        // Wait for a server-side authentication error to appear.
        await this.element.globalAuthError.waitFor({ state: 'visible', timeout: 7000 });
        await expect(this.element.globalAuthError).toBeVisible();
    }
}