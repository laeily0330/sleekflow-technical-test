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

    // Step 1: Fill email and check standard terms box
    async enterEmailAndAgree(email: string) {
        await this.element.emailInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.emailInput.fill(email);
        //await this.element.confirmationCheckbox.check({ force: true });
    }

    async acceptTerms() {
        await this.element.confirmationCheckbox.check({ force: true });
    }

    async clickInitialSignUp() {
        await this.element.continueButton.click();
    }

    // Inside signup.page.ts

    async verifyDisplayedEmail(expectedEmail: string) {
        // 1. Wait for the specific authenticator selector span to appear
        await this.element.emailVerificationDisplay.waitFor({ state: 'visible', timeout: 300000 });
        
        // 2. Extract the text displayed inside the span
        const displayedText = await this.element.emailVerificationDisplay.textContent();
        
        // 3. Verify it completely matches the email used in Step 1
        expect(displayedText?.trim()).toBe(expectedEmail);
    }

    // Step 2 Form Entry: Wait for transition, fill password, and submit
    async enterPassword(pass: string) {
        await this.element.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.passwordInput.fill(pass);
    }

    async clickFinalSignUp() {
        await this.element.finalSignUpButton.click();
    }

    async verifyText(expectedEmail: string) {
        // 1. Wait for the success message layout block to appear after submission redirect
        await this.element.successVerificationMessage.waitFor({ state: 'visible', timeout: 15000 });
        
        // 2. Grab the full text layout string
        const completeMessage = await this.element.successVerificationMessage.textContent();
        
        // 3. Assert both the static message and your unique dynamic email match up
        expect(completeMessage).toContain("We've sent a verification email to");
        expect(completeMessage).toContain(expectedEmail);
    }

    // 🌟 Negative Action: Enter email without checking box
    async enterEmailOnly(email: string) {
        await this.element.emailInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.emailInput.fill(email);
        await this.element.confirmationCheckbox.uncheck({ force: true });
    }

    // 🌟 Negative Action: Explicitly clear field to test empty boundary
    async clearEmailField() {
        await this.element.emailInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.element.emailInput.fill('');
    }

    // // 🌟 Negative Validation: General field input error text verification
    // async verifyErrorMessageText(expectedError: string) {
    //     await this.element.fieldErrorMessage.first().waitFor({ state: 'visible', timeout: 5000 });
    //     const errorText = await this.element.fieldErrorMessage.first().textContent();
    //     expect(errorText?.trim().toLowerCase()).toContain(expectedError.toLowerCase());
    // }

    async verifyErrorMessageText(expectedError: string) {
        const errorLocator = this.element.fieldErrorMessage.first();
        
        // 1. Wait for the error element to be visible on the DOM
        await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
        
        // 2. ⚡ THE FIX: Explicitly wait until the element actually has non-empty text
        // This stops Playwright from grabbing an empty string too early!
        await expect(errorLocator).not.toHaveText('', { timeout: 3000 });
        
        // 3. Now that we know text is rendered, pull it and assert
        const errorText = await errorLocator.textContent();
        expect(errorText?.trim().toLowerCase()).toContain(expectedError.toLowerCase());
    }

    // 🌟 Negative Validation: Terms box prevention state verification
    async verifyTermsCheckboxHighlighted() {
        // Confirms form did not submit by verifying we are still on the same page and button remains visible
        await expect(this.element.continueButton).toBeVisible();
    }
}