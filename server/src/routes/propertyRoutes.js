import { Router } from 'express';
import {
  createProperty,
  deleteProperty,
  getProperties,
  getPropertyById,
  updateProperty,
} from '../controllers/propertyController.js';
import { validate } from '../middleware/validate.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import {
  createPropertySchema,
  propertyQuerySchema,
  updatePropertySchema,
} from '../validators/propertyValidator.js';

const router = Router();

router.get('/', validate(propertyQuerySchema, 'query'), getProperties);
router.get('/:id', validateObjectId('id'), getPropertyById);
router.post('/', validate(createPropertySchema), createProperty);
router.put('/:id', validateObjectId('id'), validate(updatePropertySchema), updateProperty);
router.delete('/:id', validateObjectId('id'), deleteProperty);

export default router;
