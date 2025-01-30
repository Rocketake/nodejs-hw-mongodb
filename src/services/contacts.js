import { contactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};

export const getContactByID = async (studentId) => {
  const contact = await contactsCollection.findById(studentId);
  return contact;
};
