import { Router } from 'express';
const router = Router();

//controller
import { createAssembly, getAllAssembly } from '../controllers/assemblyController.js';

//middleware
import { validate } from '../middleware/handleValidation.js';
import { authGuard } from '../middleware/authGuard.js';
import { createAssemblyValidation } from '../middleware/assemblyValidation.js';

//routes
router.post('/create', authGuard, createAssemblyValidation(), validate, createAssembly);
router.get('/all', getAllAssembly);

export default router;