import { contactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (
  Page,
  PerPage,
  sortOrder,
  sortBy,
  filter = {},
) => {
  const skip = (Page - 1) * PerPage;
  const limit = PerPage;

  const contactsQuery = contactsCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavorite) {
    contactsQuery.where('isFavorite').equals(filter.isFavorite);
  }

  const [contactsCount, contacts] = await Promise.all([
    contactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, Page, PerPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactByID = async (studentId) => {
  const contact = await contactsCollection.findById(studentId);

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

  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await contactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      ...options,
    },
  );

  return result;
};
