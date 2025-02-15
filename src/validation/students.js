import Joi from 'joi';

export const createStudentsValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateStudentsValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
