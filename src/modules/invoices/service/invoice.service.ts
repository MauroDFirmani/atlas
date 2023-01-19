import { getInvoicesInfo } from '../../../puppeteer';
import { IInvoice } from '../interfaces/invoice.interface';
import { InvoiceRepository } from '../repository/invoice.repository';

export class InvoiceService {

    private invoiceRepository: InvoiceRepository;

    constructor() {
        this.invoiceRepository = new InvoiceRepository();
    }

    async getInvoices():Promise<IInvoice[]> {
        try {
            const invoices: IInvoice[] = await this.invoiceRepository.getInvoices()
            return invoices
        } catch (error) {
            console.error(error);
            throw new Error(error)
        }
    }

    async createInvoices() {
        try {
            const invoices:IInvoice[] = await getInvoicesInfo()
            const invoicesCounted = await this.invoiceRepository.countInvoices()
            const invoicesToCreate:IInvoice[] = []
            const newInvoicesLength = invoices.length - invoicesCounted
            for(let i=0; i<newInvoicesLength; i++) {
                invoicesToCreate.push(invoices[i])
            }
            newInvoicesLength > 0 && await this.invoiceRepository.createInvoices(invoicesToCreate)
            return invoicesToCreate
        } catch (error) {
            console.error(error);
            throw new Error(error)
        }
    }
}