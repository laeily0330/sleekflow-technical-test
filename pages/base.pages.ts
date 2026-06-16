import type { Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // You can add helper wrappers here later if you want
    async click(locator: any) {
        await locator.click();
    }
}