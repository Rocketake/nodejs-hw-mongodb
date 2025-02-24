import { contactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (
  user,
  page,
  perPage,
  sortOrder,
  sortBy,
  filter = {},
) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactsQuery = contactsCollection.find({ userId: user._id });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavorite) {
    contactsQuery.where('isFavorite').equals(filter.isFavorite);
  }

  const [contactsCount, contacts] = await Promise.all([
    contactsCollection
      .find({ userId: user._id })
      .merge(contactsQuery)
      .countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactByID = async (contactId, userId) => {
  const contact = await contactsCollection.findOne({
    _id: contactId,
    userId: userId,
  });

  return contact;
};

export const createContact = async ({ body, user }) => {
  const contact = await contactsCollection.create({
    ...body,
    userId: user._id,
  });
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
    userId: userId,
  });

  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const result = await contactsCollection.findOneAndUpdate(
    { _id: contactId, userId: userId },
    payload,
    {
      new: true,
      ...options,
    },
  );

  return result;
};
