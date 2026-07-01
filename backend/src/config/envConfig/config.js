import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';
config();
export const env = cleanEnv(process.env, {

    // variables de entorno de mysql
    MYSQL_DATABASE: str(),
    MYSQL_USER: str(),
    MYSQL_PASSWORD: str(),
    MYSQL_HOST: str(),
    MYSQL_PORT: str(),

    // variables de entorno de express
    PORT: str({ default: 3000 }),
});
