import { Router } from 'express';
const router = Router();

//controller
import { createCar, deleteCar, getAllCars, updateCar } from '../controllers/carController.js';

//middleware
import { authGuard } from '../middleware/authGuard.js'  

//routes
router.post('/create', authGuard, createCar);
router.get('/all', getAllCars);
router.put('/:id', authGuard, updateCar);
router.delete('/:id', authGuard, deleteCar); 

export default router;