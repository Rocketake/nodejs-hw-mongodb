import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactByID,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactByID(contactId);

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
  const student = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result,
  });
};
