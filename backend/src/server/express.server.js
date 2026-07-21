import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
//import router from '../routes/index.js';
import authRouter from '../routes/auth/auth.js';
import usersRouter from '../routes/users/users.js';
import todoRouter from '../routes/todo/todo.js';
import perfilRouter from '../routes/perfil/perfil.js';
import uploadRouter from '../routes/uploads/upload.js';

//como numero de telefono el que sirve la ifnromacion 
//y que se puede hacer
class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.middleware();//las validaciones que necesita la app
        //codigo que se ejecuta antes de que pase algo
        this.routes();//canales por los cuales se va a comunicar la app
        this.handleErrors();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(fileUpload());
    }

    routes() {
        this.app.use('/auth', authRouter);
        this.app.use('/users', usersRouter);
        this.app.use('/todo', todoRouter);
        this.app.use('/perfil', perfilRouter);
        this.app.use('/uploads', uploadRouter);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Conectado al puerto ${this.port}`);
        });
    }

    handleErrors() {
        this.app.use((err, req, res, next) => {
            if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
                console.error("JSON inválido en la petición:", err.message);
                return res.status(400).json({ message: "JSON inválido en la petición" });
            }
            next(err);
        });
    }
}

export default Server;
