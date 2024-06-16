import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} character',
    'string.max': 'Username should have at most {#limit} character',
    'any.required': '{#label} is required',
  }),
  email: Joi.string()
    .required()
    .email()
    .message('Must be a valid email address'),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
