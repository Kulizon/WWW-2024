import { Router } from 'express';
import { getGameById, addQuestion, removeQuestion } from '../controllers/gameController.js';

const router = Router();

router.get('/:id', getGameById);
router.post('/:id/add-question', addQuestion); 
router.delete('/:id/remove-question/:questionId', removeQuestion); 

export default router;
