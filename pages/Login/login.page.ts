import { expect, type Page } from "@playwright/test";
import { BasePage } from "../base.pages";
import { loginLocator } from "./login.locator";

export class LoginPage extends BasePage {
    readonly element: ReturnType<typeof loginLocator>;
    
    constructor(page: Page) {
        super(page);
        this.element = loginLocator(page);
    }

    async clickLoginNav() {
        //await this.element.loginNavigationButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.loginNavigationButton.click();
    }

    async navigatetoLoginPortal(): Promise<Page> {
        // 1. Set up the listener for the new tab popup event
        const pagePromise = this.page.waitForEvent('popup');
        
        // 2. Click the 'Start for Free' or landing page link that triggers the popup
        await this.page.getByRole('navigation').getByRole('link', { name: 'Log In' }).click();
        
        // 3. Wait for the new tab to register and finish loading
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        
        return newTab;
    }

    async verifyOnLoginPage() {
        // 1. Explicitly wait for the unique "Sign in to continue" header text to render
        await this.element.loginPageHeader.waitFor({ state: 'visible', timeout: 10000 });
        
        // 2. Double check the input fields are ready for text entry
        await expect(this.element.usernameInput).toBeVisible();
    }

    async enterUsername(username: string) {
        await this.element.usernameInput.fill(username);
    }

    async clickContinue() {
        await this.element.continueButton.click();
    }

    async verifyDisplayedEmail(expectedEmail: string) {
        await this.element.emailVerificationDisplay.waitFor({ state: 'visible', timeout: 5000 });
        const text = await this.element.emailVerificationDisplay.textContent();
        expect(text?.trim()).toBe(expectedEmail);
    }

    async enterPassword(password: string) {
        await this.element.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.element.signInButton.click();
    }

    async verifyUserIsLoggedIn() {
        // ⚡ THE FIX: Target any of the three landed URL states using a regex OR match
        //const authorizedRoutes = /register-company|onboarding\/ai-checklist|inbox\?sandbox=true/i;
        const authorizedRoutes = /register-company|onboarding\/ai-checklist|inbox/i;
        
        // Web-first assertion will poll the URL repeatedly until the redirect completes
        await expect(this.page).toHaveURL(authorizedRoutes, { timeout: 15000 });
    }

    // Clears field explicitly to ensure a purely empty submission path
    async enterEmptyUsername() {
        await this.element.usernameInput.fill('');
    }

    // Custom step method to enter any string dynamically
    async enterAnyPassword(password: string) {
        await this.element.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.passwordInput.fill(password);
    }

    // Verifies client-side validation for empty fields
    async verifyEmailInputErrorVisible() {
        // If it's a native HTML5 validation message, we check validity properties
        const isEmptyVisible = await this.element.usernameInput.evaluate((input: HTMLInputElement) => !input.checkValidity());
        if (!isEmptyVisible) {
            // Fallback check for custom rendered UI error text elements
            await this.element.emailInputError.waitFor({ state: 'visible', timeout: 5000 });
            await expect(this.element.emailInputError).toBeVisible();
        }
    }

    // Verifies server-side credential authentication issues (wrong password or unregistered)
    async verifyGlobalAuthErrorVisible() {
        await this.element.globalAuthError.waitFor({ state: 'visible', timeout: 7000 });
        await expect(this.element.globalAuthError).toBeVisible();
    }
}