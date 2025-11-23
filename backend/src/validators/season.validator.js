import Joi from 'joi'

export const newSeasonSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  from_date: Joi.date().iso().messages({
    'any.required': 'From date is required.',
    'date.format': 'From date must be in ISO format.',
  }),
  to_date: Joi.date().iso().greater(Joi.ref('from_date')).messages({
    'any.required': 'To date is required.',
    'date.format': 'To date must be in ISO format.',
    'date.base': 'To date must be greater than From date.',
  }),
})

export const updateSeasonSchema = newSeasonSchema.fork(
  Object.keys(newSeasonSchema.describe().keys),
  (s) => s.optional()
)
