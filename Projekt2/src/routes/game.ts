import { Router } from 'express';
import { getGameById } from '../controllers/gameController';

const router = Router();

//@ts-ignore
router.get('/:id', getGameById);

export default router;
