import { Router } from 'express';
import { getAllGames } from '../controllers/gameController.js';
const router = Router();
router.get('/', getAllGames);
export default router;
