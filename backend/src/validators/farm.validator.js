import Joi from 'joi'

export const newFarmSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  place: Joi.string().allow('').optional(),
  capacity: Joi.string().allow('').optional(),
})

export const updateFarmSchema = newFarmSchema.fork(
  Object.keys(newFarmSchema.describe().keys),
  (s) => s.optional()
)
