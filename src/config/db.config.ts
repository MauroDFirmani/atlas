import { Sequelize } from 'sequelize-typescript'
import { Invoice } from '../modules/invoices/model/invoice.model';

export const connect = () => {

    const hostName = process.env.HOST;
    const userName = process.env.USER;
    const password = process.env.PASSWORD;
    const database = process.env.DB;
    const dialect: any = process.env.DIALECT;
    
    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    sequelize.addModels([Invoice]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    return db;

}