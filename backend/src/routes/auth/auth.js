import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
    try {
        const registerData = req.body;
        console.log(registerData);
        res.json({ message: 'Registro exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

export default authRouter;