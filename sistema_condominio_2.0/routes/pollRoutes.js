import { Router } from 'express';
const router = Router();

//controller
import { createPoll, getPolls, getResultsPoll, votePoll } from '../controllers/pollController.js';


//middleware
import { validate } from '../middleware/handleValidation.js';
import { authGuard } from '../middleware/authGuard.js';
import { pollValidation } from '../middleware/pollValidation.js';

//routes
router.post('/create', authGuard, pollValidation(), validate, createPoll);
router.get('/all', authGuard, getPolls)
router.post('/:id/vote', authGuard, votePoll);
router.get('/:id', getResultsPoll);

export default router;