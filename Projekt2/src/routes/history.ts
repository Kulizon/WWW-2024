import { Router } from 'express';
import { getAllGames } from '../controllers/gameController';

const router = Router();

router.get('/', getAllGames);

export default router;
