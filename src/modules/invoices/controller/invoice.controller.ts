import { Logger } from '../../../logger';
import { InvoiceService } from '../service/invoice.service';

export class InvoiceController {

    private invoiceService: InvoiceService;
    private logger: Logger;

    constructor() {
        this.invoiceService = new InvoiceService();
        this.logger = new Logger()
    }

    async getInvoices() {
        this.logger.info('Controller: getInvoices', null)
        return await this.invoiceService.getInvoices();
    }

    async createInvoices() {
        this.logger.info('Controller: createInvoices', null)
        return await this.invoiceService.createInvoices();
    }

}