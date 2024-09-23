import express from 'express';
import upload from '../config/multerPhoto';

const router = express.Router();


// Controller
import { updateUser, registerUser, deleteUser } from '../controllers/UserController';

// Middleware
import validate from '../middleware/handleValidation';
import { updateValidation, userCreateValidation } from '../middleware/userValidation';

// Routes
router.post('/register', upload.single('photo'), userCreateValidation(), validate, registerUser);
router.put('/:id', upload.single('photo'), updateValidation(), validate, updateUser);
router.delete('/:id', deleteUser);

export default router; 
  