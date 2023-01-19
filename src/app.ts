import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "./logger";
import 'dotenv/config'
import { InvoiceController } from "./modules/invoices/controller/invoice.controller";

class App {

    public express: express.Application;
    public logger: Logger;
    public invoiceController: InvoiceController;
    public clientDatabase: any


    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new Logger();
        this.invoiceController = new InvoiceController();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get('/api/invoices', (req, res) => {
            this.invoiceController.getInvoices().then(data => res.json(data));
        });

        this.express.post('/api/invoices', (req, res) => {
            this.invoiceController.createInvoices().then(data => res.json(data));
        });

        this.express.get("/", (req, res, next) => {
            res.send("Hi there!");
        });

        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;