"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRepository = void 0;
const db_config_1 = require("../../../config/db.config");
const invoice_model_1 = require("../model/invoice.model");
class InvoiceRepository {
    constructor() {
        this.db = {};
        this.db = (0, db_config_1.connect)();
        // For Development
        this.db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
        this.invoiceRespository = this.db.sequelize.getRepository(invoice_model_1.Invoice);
    }
    async getInvoices() {
        try {
            const invoices = await this.invoiceRespository.findAll();
            return invoices;
        }
        catch (err) {
            console.log(err);
            throw new Error(`Error to get Invoices: ${err}`);
        }
    }
    async createInvoices(invoices) {
        try {
            const promises = [];
            for (let i = 0; i < invoices.length; i++) {
                promises.push(this.invoiceRespository.create(invoices[i]));
            }
            await Promise.all(promises);
            return invoices;
        }
        catch (err) {
            this.logger.error('Error::' + err);
            throw new Error(`Error to create Invoices: ${err}`);
        }
    }
    async countInvoices() {
        try {
            const invoicesCounted = await this.invoiceRespository.count();
            return invoicesCounted;
        }
        catch (err) {
            this.logger.error('Error::' + err);
            throw new Error(`Error to create Invoices: ${err}`);
        }
    }
}
exports.InvoiceRepository = InvoiceRepository;
