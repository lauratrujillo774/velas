import { Router } from 'express';
import { connection } from '../../config/mysql/dbmysql.js';
import { uploadimg } from '../uploads/upload.js';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
    try {
        const firstName = req.body.firstName || (req.body.name ? req.body.name.split(' ')[0] : '');
        const lastName = req.body.lastName || (req.body.name ? req.body.name.split(' ').slice(1).join(' ') : '');
        const username = req.body.username;
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password;
        let foto = req.body.img || req.body.photo || '';
        const confirmPassword = req.body.confirmPassword;
        const name = [firstName, lastName].filter(Boolean).join(' ').trim();

        if (!name || !username || !phone || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        if (foto){
          const img = await uploadimg(req, res);
          if (img.status === 'error') {
              return res.status(400).json({ message: img.message });
          }
          foto = img.data.secure_url; // Assuming the uploadimg function returns an object with a 'data' property containing the URL
        }
        // `foto` should already be a URL sent from the frontend after uploading
        // the image to `/uploads`. Do not re-upload here.
        console.log(req.body);
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Formato de correo electrónico inválido' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Las contraseñas no coinciden' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
        }

        const [existingUser] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        const [result] = await connection.promise().query('INSERT INTO users (name, email, password, foto) VALUES (?, ?, ?, ?)', [name, email, password, foto]);
        res.json({ message: 'Registro exitoso', data: { id: result.insertId, name, email } });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Formato de correo electrónico inválido' });
        }
        const [user] = await connection.promise().query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (user.length === 0) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }
        res.json({ message: 'Inicio de sesión exitoso', data: user[0] ,token: 'mensaje de token'});
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
})
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export default authRouter;