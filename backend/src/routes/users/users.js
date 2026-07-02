import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/:id', async (req, res) => {
    console.log(req.params.id);
    res.json({ message: 'Hola desde holi desde usuarios' });
});

export default usersRouter;

