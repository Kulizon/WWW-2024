import { Router } from 'express';
import Game from '../models/Game.js';
const router = Router();
router.get('/', (req, res) => {
    res.render('new-game');
});
router.post('/', async (req, res) => {
    const players = req.body.players;
    if (!Array.isArray(players) || players.length < 3) {
        return res.status(400).render('new-game', { error: 'You must provide at least 3 players.' });
    }
    for (const player of players) {
        if (!player.name || player.name.trim().length < 3) {
            return res.status(400).render('new-game', { error: 'All player names must be at least 3 characters long.' });
        }
        if (!player.password || player.password.trim().length < 3) {
            return res.status(400).render('new-game', { error: 'All passwords must be at least 3 characters long.' });
        }
    }
    const newGame = new Game({
        players: players.map((player) => ({
            name: player.name,
            password: player.password,
        })),
        createdAt: new Date(),
    });
    try {
        await newGame.save();
        res.redirect(`/game/${newGame._id}`);
    }
    catch (error) {
        console.error('Error saving new game:', error);
        res.status(500).render('new-game', { error: 'Server error while saving the game. Please try again later.' });
    }
});
export default router;
