import { expect, type Page } from "@playwright/test";
import { BasePage } from "../base.pages";
import { signUpLocator } from "./signup.locator";

// Page object model for the signup journey.
// Encapsulates page actions and validations for the signup user flow.
export class SignUpPage extends BasePage {
    readonly element: ReturnType<typeof signUpLocator>;
    
    constructor(page: Page) {
        super(page);
        // Initialize locator references once during page object construction.
        this.element = signUpLocator(page);
    }

    async navigate() {
        // Navigate to the SleekFlow homepage as the entry point for signup.
        await this.page.goto('https://www.sleekflow.io'); 
    }
    
    async navigatetoSignUp(): Promise<Page> {
        // The signup flow opens in a popup/new tab, so we listen for the popup event.
        const pagePromise = this.page.waitForEvent('popup');
        await this.page.getByRole('navigation').getByRole('link', { name: 'Start for Free' }).click();
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        return newTab;
    }

    // Fill the email input in the signup form.
    async enterEmailAndAgree(email: string) {
        await this.element.emailInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.emailInput.fill(email);
    }

    // Explicitly check the terms of service agreement checkbox.
    async acceptTerms() {
        await this.element.confirmationCheckbox.check({ force: true });
    }

    // Click the primary continue button to proceed from the email screen.
    async clickInitialSignUp() {
        await this.element.continueButton.click();
    }

    async verifyDisplayedEmail(expectedEmail: string) {
        // Resolve the email verification display locator from the factory again,
        // since the page may have navigated or re-rendered in the signup flow.
        const targetLocator = signUpLocator(this.page).emailVerificationDisplay;
        console.log(`[QA Debug] Waiting for screen text to match expected string: ${expectedEmail}`);
        await expect(targetLocator).toHaveText(expectedEmail, { timeout: 15000 });
    }

    // Enter password one keystroke at a time to simulate realistic typing.
    async enterPassword(pass: string) {
        await this.element.passwordInput.pressSequentially(pass, { delay: 100 });
    }

    // Submit the final signup form.
    async clickFinalSignUp() {
        await this.element.finalSignUpButton.click();
    }

    async verifyText(expectedEmail: string) {
        // Wait for the success notification containing the dynamic email.
        await this.element.successVerificationMessage.waitFor({ state: 'visible', timeout: 300000 });
        const completeMessage = await this.element.successVerificationMessage.textContent();
        expect(completeMessage).toContain("We've sent a verification email to "+expectedEmail+".");
    }

    // Negative flow: enter email and explicitly make terms unchecked.
    async enterEmailOnly(email: string) {
        await this.element.emailInput.waitFor({ state: 'visible', timeout: 300000 });
        await this.element.emailInput.fill(email);
        await this.element.confirmationCheckbox.uncheck({ force: true });
    }

    // Negative flow: clear the email field to test empty input validation.
    async clearEmailField() {
        await this.element.emailInput.waitFor({ state: 'visible', timeout: 300000 });
        await this.element.emailInput.fill('');
    }

    async verifyErrorMessageText(expectedError: string) {
        const errorLocator = this.element.fieldErrorMessage.first();
        await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
        await expect(errorLocator).not.toHaveText('', { timeout: 3000 });
        const errorText = await errorLocator.textContent();
        expect(errorText?.trim().toLowerCase()).toContain(expectedError.toLowerCase());
    }

    // Assert that the signup flow has not progressed due to terms checkbox validation.
    async verifyTermsCheckboxHighlighted() {
        await expect(this.element.continueButton).toBeVisible();
    }
}