import { Router } from 'express';
import Game from '../models/Game.js';
const router = Router();
router.get('/', async (req, res) => {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    try {
        const totalGames = await Game.countDocuments();
        const games = await Game.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalPages = Math.ceil(totalGames / limit);
        res.render('history', { games, page, totalPages });
    }
    catch (error) {
        res.status(500).send('Błąd serwera');
    }
});
export default router;
