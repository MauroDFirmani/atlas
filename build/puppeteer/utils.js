"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchWrapper = void 0;
async function tryCatchWrapper(page, browser, selector, options) {
    try {
        await page.waitForSelector(selector, options);
    }
    catch (error) {
        console.error(`Selector ${selector} does not exist!`);
        await Promise.allSettled([page.close(), browser.close()]);
    }
}
exports.tryCatchWrapper = tryCatchWrapper;
