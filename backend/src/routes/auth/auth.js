import { Router } from "express";

const router = Router();

router.post('/login', (_req, res) => {
    res.json({ message: 'Login' });
});

router.post('/register', (_req, res) => {
    res.json({ message: 'Register' });
});

router.post('/logout', (_req, res) => {
    res.json({ message: 'Logout' });
});

export default router;
