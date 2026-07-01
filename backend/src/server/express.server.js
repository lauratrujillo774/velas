import express from 'express';
import cors from 'cors';
import router from '../routes/index.js';
import { env } from '../config/envConfig/config.js';

class Server {
    constructor() {
        this.app = express();
        this.port = env.PORT;
        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(cors()); // Habilita CORS
        this.app.use(express.json()); // Habilita el parseo de JSON

        this.app.use(express.static('../../../frontend/dist')); // Habilita archivos estáticos
    }

    routes() {
        this.app.use('/', router);
    }

    async start() {
        try {
            // Iniciar el servidor
            await this.app.listen(this.port);
            console.log(`Conectado al puerto ${this.port}`);
        } catch (error) {
            // Error al iniciar el servidor
            console.log(error);
            process.exit(1);
        }
    } // Fin del método start

    getApp() {
        return this.app;
    } // Fin del método getApp

    async stop() {
        if (this.server) {
            await new Promise((resolve) => this.server.close(resolve));
        }
    } // Fin del método stop
} // Fin de la clase Server
export default Server; // Exportación de la clase Server
