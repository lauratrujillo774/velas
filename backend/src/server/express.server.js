import express from 'express';
import cors from 'cors';
//import router from '../routes/index.js';
import authRouter from '../routes/auth/auth.js';
import usersRouter from '../routes/users/users.js';
import todoRouter from '../routes/todo/todo.js';
import perfilRouter from '../routes/perfil/perfil.js';

//como numero de telefono el que sirve la ifnromacion 
//y que se puede hacer
class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.middleware();//las validaciones que necesita la app
        //codigo que se ejecuta antes de que pase algo
        this.routes();//canales por los cuales se va a comunicar la app
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/auth', authRouter);
        this.app.use('/users', usersRouter);
        this.app.use('/todo', todoRouter);
        this.app.use('/perfil', perfilRouter);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Conectado al puerto ${this.port}`);
        });
    }
}

export default Server;
