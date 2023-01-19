"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const logger_1 = require("./logger");
require("dotenv/config");
const invoice_controller_1 = require("./modules/invoices/controller/invoice.controller");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new logger_1.Logger();
        this.invoiceController = new invoice_controller_1.InvoiceController();
    }
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
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
exports.default = new App().express;
