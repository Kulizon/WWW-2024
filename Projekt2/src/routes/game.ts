import { Router, Request, Response } from 'express';
import Game from '../../models/Game.js';

const router = Router();

//@ts-ignore
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    const gameId = req.params.id;

    try {
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).send('Game not found');
        }
        res.render('game', { game });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

export default router;