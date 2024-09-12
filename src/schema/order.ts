import Joi from "joi";

const status = ["pending", "completed", "cancelled"];

//Schema to get id from params
export const orderParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "any.required": "Id is required",
  }),
});

//Schema to get order
export const getOrderQuerySchema = Joi.object({
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

const orderItem = Joi.object({
  groceryId: Joi.string().uuid().required().messages({
    "any.required": "Grocery Id is required",
  }),
  quantity: Joi.number().required().messages({
    "any.required": "Quantity is required",
  }),
});

//Schema to order body
export const orderBodySchema = Joi.object({
  items: Joi.array().items(orderItem).required().messages({
    "any.required": "Array of items is required",
  }),
}).options({
  stripUnknown: true,
});

//schema to update order status
export const orderStatusBodySchema = Joi.object({
  status: Joi.string()
    .required()
    .messages({
      "any.required": "status is required",
      "status.not_defined": "Possible status: pending | completed | cancelled",
    })
    .custom((value, helpers) => {
      if (!status.includes(value)) {
        return helpers.error("status.not_defined");
      }

      return value;
    }),
}).options({
  stripUnknown: true,
});
