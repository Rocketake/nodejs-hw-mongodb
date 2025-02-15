import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValid = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw new createHttpError(400, 'id is not valid');
  }
  next();
};
