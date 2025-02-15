import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  upsertStudentController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentsValidationSchema,
  updateStudentsValidationSchema,
} from '../validation/students.js';
import { isValid } from '../middlewares/isValid.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get(
  '/contacts/:contactId',
  isValid,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(createStudentsValidationSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/contacts/:contactId',
  isValid,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/contacts/:contactId',
  isValid,
  validateBody(updateStudentsValidationSchema),
  ctrlWrapper(upsertStudentController),
);
export default router;
