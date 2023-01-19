"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoicesInfo = void 0;
const constants_1 = require("../utils/constants");
const browser_1 = require("./browser");
const utils_1 = require("./utils");
function getInvoicesInfo() {
    return (0, browser_1.withPage)(async (page, browser) => {
        await page.goto(`${constants_1.login.url}/auth`, {
            waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"]
        });
        await page.type(constants_1.selectors.inputEmail, constants_1.login.email);
        await page.type(constants_1.selectors.inputPassword, constants_1.login.password);
        await page.keyboard.press('Enter');
        await (0, utils_1.tryCatchWrapper)(page, browser, constants_1.selectors.paneComprobantes, { visible: true });
        await page.goto(`${constants_1.login.url}/invoices`);
        await (0, utils_1.tryCatchWrapper)(page, browser, 'table tr td', { visible: true });
        const data = await page.$$eval('table tr td', tds => tds.map((td) => {
            if (td.innerText === 'Descargar') {
                return td.innerHTML.includes('disabled') ? 'Pending' : 'Completed';
            }
            return td.innerText;
        }));
        let count = 0;
        const result = [];
        let obj = { fecha: '', tipo: '', monto: '', estado: '' };
        for (let i = 0; i < data.length; i++) {
            switch (count) {
                case 0:
                    obj.fecha = data[i];
                    count++;
                    break;
                case 1:
                    count++;
                    break;
                case 2:
                    obj.tipo = data[i];
                    count++;
                    break;
                case 3:
                    obj.monto = data[i];
                    count++;
                    break;
                case 4:
                    obj.estado = data[i];
                    result.push({ ...obj });
                    count = 0;
                    break;
                default:
                    count++;
                    break;
            }
        }
        await Promise.allSettled([page.close(), browser.close()]);
        return result;
    });
}
exports.getInvoicesInfo = getInvoicesInfo;
