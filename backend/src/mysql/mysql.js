import { Sequelize } from 'sequelize';

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;
const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        port,
        dialect: 'mysql'
    }
);

const dbConnectMysql = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado a la base de datos mysql');
    } catch (error) {
        console.log(error);
    }
}

export { sequelize, dbConnectMysql };