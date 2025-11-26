import Joi from 'joi'

export const newItemCategory = Joi.object({
  name: Joi.string().min(3).max(100).required(),
})

export const updateItemsCategory = newItemCategory.fork(
  Object.keys(newItemCategory.describe().keys),
  (s) => s.optional()
)

export const newItemSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
})

export const updateItemsSchema = newItemSchema.fork(
  Object.keys(newItemSchema.describe().keys),
  (s) => s.optional()
)
