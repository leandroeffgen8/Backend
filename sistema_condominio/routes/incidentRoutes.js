import { Router } from "express";
const router = Router();

//controller
import { createIncident, deleteIncident, getAllIncidents, getMyIncident, updateIncident } from "../controllers/incidentController.js";

//middleware
import { validate } from '../middleware/handleValidation.js';
import { authGuard } from "../middleware/authGuard.js";
import { incidentValidation } from "../middleware/incidentValidation.js";

//routes
router.post('/create', authGuard, incidentValidation(), validate, createIncident)
router.get('/all', getAllIncidents);
router.get('/my-incidents', authGuard, getMyIncident);
router.put('/:id', authGuard, updateIncident);
router.delete('/:id', deleteIncident);

export default router;