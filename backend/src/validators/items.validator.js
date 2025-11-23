import Joi from 'joi'

export const createItemsCategory = Joi.object({
  name: Joi.string().min(3).max(100).required(),
})

export const updateItemsCategory = createItemsCategory.fork(
  Object.keys(createItemsCategory.describe().keys),
  (s) => s.optional()
)

export const newItemSchema = Joi.object({
  master_id: Joi.number().integer().required(),
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().required(),
  status: Joi.number().optional(),
})

export const updateItemsSchema = newItemSchema.fork(
  Object.keys(newItemSchema.describe().keys),
  (s) => s.optional()
)
