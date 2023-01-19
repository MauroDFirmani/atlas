import { Page, WaitForSelectorOptions } from "puppeteer";

export async function tryCatchWrapper(page: Page, browser, selector: string, options?: WaitForSelectorOptions): Promise<void> {
    try {
        await page.waitForSelector(selector, options);
    }
    catch (error) {
        console.error(`Selector ${selector} does not exist!`)
        await Promise.allSettled([page.close(), browser.close()]);
    }
}