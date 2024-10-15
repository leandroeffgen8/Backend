import { Router } from "express";
const router = Router();

// Controller
import { createUser, deleteUser, getAllUser, getCurrentUser, getUserByID, login, updateUser } from "../controllers/userController.js";
 
// Middleware
import { validate } from "../middleware/handleValidation.js";
import { loginValidation, updateValidation, userCreateValidation } from "../middleware/userValidation.js";
import { authGuard } from "../middleware/authGuard.js";
import { imageUpload } from "../middleware/uploadImage.js";

//Routes
router.post('/create', userCreateValidation(), validate, createUser)
router.post('/login', loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser);
router.put('/', authGuard, updateValidation(), validate, imageUpload.single('profileImage'), updateUser);
router.get('/all', getAllUser);
router.get('/:id', getUserByID);
router.delete('/:id', deleteUser);


export default router;