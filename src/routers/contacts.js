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
} from '../validation/contacts.js';
import { isValid } from '../middlewares/isValid.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/:contactId',
  isValid,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(createStudentsValidationSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValid,
  ctrlWrapper(deleteContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValid,
  validateBody(updateStudentsValidationSchema),
  ctrlWrapper(upsertStudentController),
);
export default contactsRouter;
