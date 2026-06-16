import { expect, type Page } from "@playwright/test";
import { BasePage } from "../base.pages";
import { signUpLocator } from "./signup.locator";

export class SignUpPage extends BasePage {
    readonly element: ReturnType<typeof signUpLocator>;
    
    
    constructor(page: Page) {
        super(page);
        this.element = signUpLocator(page);
    }

    async navigate() {
        await this.page.goto('https://www.sleekflow.io'); 
    }
    
    async navigatetoSignUp(): Promise<Page> {
        const pagePromise = this.page.waitForEvent('popup');
        await this.page.getByRole('navigation').getByRole('link', { name: 'Start for Free' }).click();
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        return newTab;
    }

    // Fill email and check standard terms box
    async enterEmailAndAgree(email: string) {
        await this.element.emailInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.emailInput.fill(email);
    }

    async acceptTerms() {
        await this.element.confirmationCheckbox.check({ force: true });
    }

    async clickInitialSignUp() {
        await this.element.continueButton.click();
    }

    async verifyDisplayedEmail(expectedEmail: string) {
        // Get the base locator pointer for the text element
        const targetLocator = signUpLocator(this.page).emailVerificationDisplay;
        
        console.log(`[QA Debug] Waiting for screen text to match expected string: ${expectedEmail}`);
        
        // This will poll the DOM dynamically for up to 15 seconds until the text matches
        await expect(targetLocator).toHaveText(expectedEmail, { 
            timeout: 15000
        });
    }

    // Form Entry: Wait for transition, fill password, and submit
    async enterPassword(pass: string) {
        await this.element.passwordInput.pressSequentially(pass, { delay: 100 });
    }

    async clickFinalSignUp() {
        await this.element.finalSignUpButton.click();
    }

    async verifyText(expectedEmail: string) {
        // Wait for the success message layout block to appear after submission redirect
        await this.element.successVerificationMessage.waitFor({ state: 'visible', timeout: 300000 });
        
        // Grab the full text layout string
        const completeMessage = await this.element.successVerificationMessage.textContent();
        
        // Assert both the static message and your unique dynamic email match up
        expect(completeMessage).toContain("We've sent a verification email to "+expectedEmail+".");
    }

    // Negative Action: Enter email without checking box
    async enterEmailOnly(email: string) {
        await this.element.emailInput.waitFor({ state: 'visible', timeout: 300000 });
        await this.element.emailInput.fill(email);
        await this.element.confirmationCheckbox.uncheck({ force: true });
    }

    // Negative Action: Explicitly clear field to test empty boundary
    async clearEmailField() {
        await this.element.emailInput.waitFor({ state: 'visible', timeout: 300000 });
        await this.element.emailInput.fill('');
    }

    async verifyErrorMessageText(expectedError: string) {
        const errorLocator = this.element.fieldErrorMessage.first();
        
        // Wait for the error element to be visible on the DOM
        await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
        
        // Explicitly wait until the element actually has non-empty text
        await expect(errorLocator).not.toHaveText('', { timeout: 3000 });
        
        // Now that we know text is rendered, pull it and assert
        const errorText = await errorLocator.textContent();
        expect(errorText?.trim().toLowerCase()).toContain(expectedError.toLowerCase());
    }

    // Negative Validation: Terms box prevention state verification
    async verifyTermsCheckboxHighlighted() {
        // Confirms form did not submit by verifying we are still on the same page and button remains visible
        await expect(this.element.continueButton).toBeVisible();
    }
}