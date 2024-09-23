import express from 'express';
import UserRoutes from './UserRoutes';

const router = express.Router();

// Routes
router.use('/api/user', UserRoutes);

export default router

