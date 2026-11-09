import { Router } from 'express';
import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
} from '../controllers/inquiryController.js';
import { validate } from '../middleware/validate.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import {
  createInquirySchema,
  inquiryQuerySchema,
  updateInquiryStatusSchema,
} from '../validators/inquiryValidator.js';

const router = Router();

router.post('/', validate(createInquirySchema), createInquiry);
router.get('/', validate(inquiryQuerySchema, 'query'), getInquiries);
router.get('/:id', validateObjectId('id'), getInquiryById);
router.patch(
  '/:id/status',
  validateObjectId('id'),
  validate(updateInquiryStatusSchema),
  updateInquiryStatus
);

export default router;
