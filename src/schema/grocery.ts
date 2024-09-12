import Joi from "joi";

//Schema to get id from params
export const groceryParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "any.required": "Id is required",
  }),
});

//Schema to get grocery
export const getGroceryQuerySchema = Joi.object({
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

//Schema to grocery body
export const groceryBodySchema = Joi.object({
  imageUrl: Joi.string().required().messages({
    "any.required": "Image Url is required",
  }),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
  }),
  price: Joi.number().required().messages({
    "any.required": "Price is required",
  }),
  quantity: Joi.number().required().messages({
    "any.required": "Quantity is required",
  }),
}).options({
  stripUnknown: true,
});

//schema to update grocery quantity
export const groceryQuantityBodySchema = Joi.object({
  quantity: Joi.number().required().messages({
    "any.required": "Quantity is required",
  }),
}).options({
  stripUnknown: true,
});
