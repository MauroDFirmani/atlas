import puppeteer, {Page} from 'puppeteer';

export async function withPage<T>(func: (page: Page, browser) => Promise<T>): Promise<T> {
    const browser = await puppeteer.launch({
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