import { connect } from "../../../config/db.config";
import { Logger } from "../../../logger";
import { IInvoice } from "../interfaces/invoice.interface";
import { Invoice } from "../model/invoice.model";


export class InvoiceRepository {

    private logger: Logger;
    private db: any = {};
    private invoiceRespository: any;

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
        this.invoiceRespository = this.db.sequelize.getRepository(Invoice);
    }

    async getInvoices():Promise<IInvoice[]> {
        try {
            const invoices = await this.invoiceRespository.findAll();
            return invoices;
        } catch (err) {
            console.log(err);
            throw new Error(`Error to get Invoices: ${err}`)
        }
    }

    async createInvoices(invoices: IInvoice[]) {
        try {
            const promises = []
            for (let i = 0; i < invoices.length; i++) {
                promises.push(this.invoiceRespository.create(invoices[i]));
            }
            await Promise.all(promises);
            return invoices
        } catch (err) {
            this.logger.error('Error::' + err);
            throw new Error(`Error to create Invoices: ${err}`)
        }
    }

    async countInvoices(): Promise<number> {
        try {
            const invoicesCounted = await this.invoiceRespository.count();
            return invoicesCounted
        } catch (err) {
            this.logger.error('Error::' + err);
            throw new Error(`Error to create Invoices: ${err}`)
        }
    }

}