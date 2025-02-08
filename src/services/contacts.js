import createHttpError from 'http-errors';
import { contactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};

export const getContactByID = async (studentId) => {
  const contact = await contactsCollection.findById(studentId);
  if (!contact) {
    throw new createHttpError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
  });
  if (!contact) {
    throw new createHttpError(404, 'Contact not found');
  }

  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await contactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
  );
  if (!result) {
    throw new createHttpError(404, 'Contact not found');
  }

  return result;
};
