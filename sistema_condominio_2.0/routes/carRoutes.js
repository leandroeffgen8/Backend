import { Router } from 'express';
const router = Router();

//controller
import { createCar, deleteCar, getAllCars, getMyCars, updateCar } from '../controllers/carController.js';

//middleware
import { validate } from '../middleware/handleValidation.js';
import { authGuard } from '../middleware/authGuard.js'  
import { createCarValidation } from '../middleware/carValidation.js';

//routes
router.post('/create', authGuard, createCarValidation(), validate, createCar);
router.get('/my-cars', authGuard, getMyCars);
router.get('/all', getAllCars);
router.put('/:id', authGuard, updateCar);
router.delete('/:id', authGuard, deleteCar); 

export default router; 