const pine = require('pine');

const logger = pine();


export class Logger {

    info(message, data) {
        logger.info(`${message}   ${undefined != data ? JSON.stringify(data) : ''}`);
    }

    error(message) {
        logger.error(message);
    }
}