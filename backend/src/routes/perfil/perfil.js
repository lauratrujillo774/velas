import { Router } from 'express';

const perfilRouter = Router();

perfilRouter.post('/:id', async (req, res) => {
    console.log(req.params.id);
    res.json({ message: 'Hola desde holix2' });
});

export default perfilRouter;