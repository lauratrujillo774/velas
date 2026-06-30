import { Router } from 'express';

const router = Router();

router.get('', async (_req, res) => {
    res.json({ message: 'Hola desde holix2' });
});

export default router;