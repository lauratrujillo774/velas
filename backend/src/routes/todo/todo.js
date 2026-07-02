import { Router } from 'express';

const todoRouter = Router();

todoRouter.get('', async (req, res) => {
    console.log(req.params.id);
    res.json({ message: 'Hola desde holix2' });
});

export default todoRouter;