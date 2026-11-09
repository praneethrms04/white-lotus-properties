import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import propertyRoutes from './propertyRoutes.js';
import inquiryRoutes from './inquiryRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/properties', propertyRoutes);
router.use('/inquiries', inquiryRoutes);

export default router;
