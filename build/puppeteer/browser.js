"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPage = void 0;
const puppeteer_1 = require("puppeteer");
async function withPage(func) {
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-background-networking',
            '--disable-default-apps',
            '--disable-extensions',
            '--disable-sync',
            '--disable-translate',
            '--hide-scrollbars',
            '--metrics-recording-only',
            '--mute-audio',
            '--no-first-run',
            '--safebrowsing-disable-auto-update',
            '--ignore-certificate-errors',
            '--ignore-ssl-errors',
            '--ignore-certificate-errors-spki-list',
            '--user-data-dir=/tmp',
        ],
    });
    const page = await browser.newPage();
    return await func(page, browser);
}
exports.withPage = withPage;
