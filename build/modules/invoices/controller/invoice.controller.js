"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const logger_1 = require("../../../logger");
const invoice_service_1 = require("../service/invoice.service");
class InvoiceController {
    constructor() {
        this.invoiceService = new invoice_service_1.InvoiceService();
        this.logger = new logger_1.Logger();
    }
    async getInvoices() {
        this.logger.info('Controller: getInvoices', null);
        return await this.invoiceService.getInvoices();
    }
    async createInvoices() {
        this.logger.info('Controller: createInvoices', null);
        return await this.invoiceService.createInvoices();
    }
}
exports.InvoiceController = InvoiceController;
