import { Router } from "express";
const router = Router();

//controller
import { createReservation, deleteReservation, getAllReservations, getMyReservation, updateReservation } from "../controllers/reservationController.js";

//middleware
import { validate } from "../middleware/handleValidation.js";
import { authGuard } from "../middleware/authGuard.js";
import { createReserveValidation } from "../middleware/reservationValidation.js";

//routes
router.post('/create', authGuard, createReserveValidation(), validate, createReservation);
router.get('/my-reserve', authGuard, getMyReservation);
router.get('/all', getAllReservations);
router.put('/:id', authGuard, updateReservation);
router.delete('/:id', authGuard, deleteReservation);

export default router;