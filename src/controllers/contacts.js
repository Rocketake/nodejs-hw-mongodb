import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactByID,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts(
    req.user,
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  );

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await getContactByID(contactId, _id);

  if (!contact) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photo = req.file;

  console.log(photo);

  let photoUrl;

  if (photo) {
    if (getEnvVar(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const student = await createContact(req, photoUrl);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await deleteContact(contactId, _id);
  if (!contact) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const photo = req.file;

  console.log(photo);

  let photoUrl;

  if (photo) {
    if (getEnvVar(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(contactId, req.body, _id, photoUrl);

  if (!result) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result,
  });
};
