import {Router} from 'express';
import { connection } from '../../config/mysql/dbmysql.js';
const uploadRouter = Router();
import cloudinary from 'cloudinary';
import fs from 'fs';

cloudinary.config(process.env.CLOUDINARY_URL);

export const uploadimg = async (req, res) => {
    if (!req.files || !req.files.img) {
        return { status: 'error', message: 'No se encontró ningún archivo en la petición' };
    }

    const file = req.files.img;
    const uploadsDir = './assets';
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const path = `${uploadsDir}/${file.name}`;
    console.log('Uploading file:', file.name);

    file.mv(path, async (err) => {
        if (err) {
            console.error('Error al mover el archivo:', err);
            return { status: 'error', message: 'Error al subir el archivo' };
        }


        cloudinary.uploader.upload(path, { folder: 'uploads' })
            .then((result) => {
                fs.unlinkSync(path);
                return { status: 'success', message: 'Archivo subido exitosamente', data: result.secure_url };
            })
            .catch((error) => {
                console.error('Error al subir el archivo a Cloudinary:', error);
                return { status: 'error', message: 'Error al subir el archivo a Cloudinary' };
            });
    });

}

uploadRouter.post('/', async (req, res) => {
    const result = await uploadimg(req, res);
    if (result.status === 'error') {
        return res.status(400).json({ message: result.message });
    }
    res.json(result);
});

uploadRouter.post('/update', async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: 'Email no proporcionado' });
    }
    if (!req.files || !req.files.img) {
        return res.status(400).json({ message: 'No se encontró ningún archivo en la petición' });
    }

    const file = req.files.img;
    const uploadsDir = './assets';
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const path = req.body.path || `${uploadsDir}/${file.name}`;
    file.mv(path, async (err) => {
        if (err) {
            console.error('Error al mover el archivo:', err);
            return res.status(500).json({ message: 'Error al subir el archivo' });
        }

        try {
            const result = await cloudinary.uploader.upload(path, { folder: 'uploads' });
            const [existingUser] = await connection.promise().query('SELECT foto FROM users WHERE email = ?', [email]);

            if (existingUser.length > 0 && existingUser[0].foto) {
                const existingPhotoUrl = existingUser[0].foto;
                const publicId = existingPhotoUrl.split('/').pop().split('.')[0];
                cloudinary.uploader.destroy(publicId);
            }

            await connection.promise().query('UPDATE users SET foto = ? WHERE email = ?', [result.secure_url, email]);
            fs.unlinkSync(path);
            res.json({ message: 'Archivo actualizado exitosamente', data: { foto: result.secure_url } });
        } catch (error) {
            console.error('Error al subir el archivo a Cloudinary:', error);
            res.status(500).json({ message: 'Error al subir el archivo a Cloudinary' });
        }
    });

})

export default uploadRouter;