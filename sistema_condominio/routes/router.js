import { Router } from "express";
import userRoutes from './userRoutes.js';
import reservationRoutes from './reservationRoutes.js'
import carRoutes from './carRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import incidentRoutes from './incidentRoutes.js'
import assemblyRoutes from './assemblyRoutes.js';
import pollRoutes from './pollRoutes.js';

const router = Router();

router.use('/api/users/', userRoutes)
router.use('/api/reservations/', reservationRoutes)
router.use('/api/car/', carRoutes)
router.use('/api/notification/', notificationRoutes)
router.use('/api/incident/', incidentRoutes)
router.use('/api/assembly/', assemblyRoutes)
router.use('/api/poll', pollRoutes)

export default router;