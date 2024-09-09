import Joi from "joi";

export const authLogInBodySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid format",
    "any.required": "Email is required",
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
