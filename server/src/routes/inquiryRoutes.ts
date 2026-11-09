import { Router } from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
} from '../controllers/inquiryController.js';
import { validate } from '../middleware/validate.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import {
  createInquirySchema,
  updateInquiryStatusSchema,
} from '../validators/inquiryValidator.js';

const router = Router();

router.post('/', validate(createInquirySchema), createInquiry);
router.get('/', getInquiries);
router.patch(
  '/:id/status',
  validateObjectId('id'),
  validate(updateInquiryStatusSchema),
  updateInquiryStatus
);

export default router;
