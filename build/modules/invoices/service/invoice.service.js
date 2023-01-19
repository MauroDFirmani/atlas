"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const puppeteer_1 = require("../../../puppeteer");
const invoice_repository_1 = require("../repository/invoice.repository");
class InvoiceService {
    constructor() {
        this.invoiceRepository = new invoice_repository_1.InvoiceRepository();
    }
    async getInvoices() {
        try {
            const invoices = await this.invoiceRepository.getInvoices();
            return invoices;
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    async createInvoices() {
        try {
            const invoices = await (0, puppeteer_1.getInvoicesInfo)();
            const invoicesCounted = await this.invoiceRepository.countInvoices();
            const invoicesToCreate = [];
            const newInvoicesLength = invoices.length - invoicesCounted;
            for (let i = 0; i < newInvoicesLength; i++) {
                invoicesToCreate.push(invoices[i]);
            }
            newInvoicesLength > 0 && await this.invoiceRepository.createInvoices(invoicesToCreate);
            return invoicesToCreate;
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
exports.InvoiceService = InvoiceService;
