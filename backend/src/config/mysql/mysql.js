
import { Sequelize } from 'sequelize';
import { env } from '../envConfig/config.js';

const sequelize = new Sequelize(
    env.MYSQL_DATABASE,
    env.MYSQL_USER,
    env.MYSQL_PASSWORD,
    {
        host: env.MYSQL_HOST,
        port: env.MYSQL_PORT,
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