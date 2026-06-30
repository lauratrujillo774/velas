import express from 'express';
import cors from 'cors';
import router from '../routes/index.js';

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/', router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Conectado al puerto ${this.port}`);
        });
    }
}

export default Server;
