import { Page } from 'puppeteer';
import { IInvoice } from '../modules/invoices/interfaces/invoice.interface';
import { login, selectors } from '../utils/constants';
import { withPage } from './browser';
import { tryCatchWrapper } from './utils';

export function getInvoicesInfo(): Promise<IInvoice[]> {
    return withPage(async (page: Page, browser) => {
        await page.goto(`${login.url}/auth`, {
            waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"]
        });

        await page.type(selectors.inputEmail, login.email);
        await page.type(selectors.inputPassword, login.password);
        await page.keyboard.press('Enter');

        await tryCatchWrapper(page, browser, selectors.paneComprobantes, { visible: true })
        await page.goto(`${login.url}/invoices`)

        await tryCatchWrapper(page, browser, 'table tr td', { visible: true })
        const data = await page.$$eval('table tr td', tds => tds.map((td) => {
            if (td.innerText === 'Descargar') {
                return td.innerHTML.includes('disabled') ? 'Pending' : 'Completed';
            }
            return td.innerText;
        }));
        let count = 0;
        const result = []
        let obj: IInvoice = { fecha: '', tipo: '', monto: '', estado: '' }
        for (let i = 0; i < data.length; i++) {
            switch (count) {
                case 0:
                    obj.fecha = data[i]
                    count++
                    break;
                case 1:
                    count++;
                    break;
                case 2:
                    obj.tipo = data[i]
                    count++
                    break;
                case 3:
                    obj.monto = data[i]
                    count++
                    break;
                case 4:
                    obj.estado = data[i]
                    result.push({ ...obj })
                    count = 0
                    break;

                default:
                    count++
                    break;
            }
        }
        await Promise.allSettled([page.close(), browser.close()]);
        return result
    })
}
