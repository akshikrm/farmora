import Joi from 'joi'

export const createItemsCategory = Joi.object({
  name: Joi.string().min(3).max(100).required(),
})

export const updateItemsCategory = createItemsCategory.fork(
  Object.keys(createItemsCategory.describe().keys),
  (s) => s.optional()
)
