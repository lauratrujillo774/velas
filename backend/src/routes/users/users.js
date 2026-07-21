import { Router } from 'express';
import { connection } from '../../config/mysql/dbmysql.js';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
    if (token !== 'mensaje de token') {
        return res.status(403).json({ message: 'Token de autenticación inválido' });
    }
   try {
    const [user] = await connection.promise().query('SELECT * FROM users');
    if (user.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario obtenido exitosamente', data: user});  
   }catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
   }
});

usersRouter.get('/:email', async (req, res) => {
    const { email } = req.params;
    const token = req.headers.authorization;
    if (!email) {
        return res.status(401).json({ message: 'Email no proporcionado' });
    }
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
    if (token !== 'mensaje de token') {
        return res.status(403).json({ message: 'Token de autenticación inválido' });
    }
    try {
        const [user] = await connection.promise().query('SELECT name,email,foto FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario obtenido exitosamente', data: user });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

export default usersRouter;

