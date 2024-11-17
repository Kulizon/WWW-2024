import { Router } from 'express';
import { createGame } from '../controllers/gameController.js';
const router = Router();
router.get('/', (req, res) => {
    res.render('new-game');
});
router.post('/', createGame);
export default router;
