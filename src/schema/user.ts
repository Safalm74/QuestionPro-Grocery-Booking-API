import Joi from "joi";

//Schema to get id from params
export const userParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "any.required": "Id is required",
  }),
});

//Schema to get user
export const getUserQuerySchema = Joi.object({
  id: Joi.string().uuid().optional(),

  page: Joi.number().optional().messages({
    "number.base": "page must be a number",
    "page.base": "page must be greater than zero",
  }),

  size: Joi.number()
    .min(1)
    .max(10)
    .optional()
    .messages({
      "number.base": "size must be a number",
    })
    .default(5),
}).options({
  stripUnknown: true,
});

//Schema to create user
export const createUserBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid format",
    "any.required": "Email is required",
  }),

  phone: Joi.string().required().messages({
    "any.required": "phone is required",
  }),
  address: Joi.string().required().messages({
    "any.required": "address is required",
  }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least of 8 character",
      "password.uppercase": "Password must contain at least a uppercase",
      "password.lowercase": "Password must contain at least a lowercase",
      "password.special": "Password must contain at least a special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }

      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }

      if (!/[!@#$%^&*]/.test(value)) {
        return helpers.error("password.special");
      }

      return value;
    }),
}).options({
  stripUnknown: true,
});

//Schema to update user
export const updateUserBodySchema = Joi.object({
  name: Joi.string().optional().messages({
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid format",
    "any.required": "Email is required",
  }),

  phone: Joi.string().optional().messages({
    "any.required": "phone is required",
  }),
  address: Joi.string().optional().messages({
    "any.required": "address is required",
  }),
  password: Joi.string()
    .min(8)
    .optional()
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least of 8 character",
      "password.uppercase": "Password must contain at least a uppercase",
      "password.lowercase": "Password must contain at least a lowercase",
      "password.special": "Password must contain at least a special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }

      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }

      if (!/[!@#$%^&*]/.test(value)) {
        return helpers.error("password.special");
      }

      return value;
    }),
}).options({
  stripUnknown: true,
});
