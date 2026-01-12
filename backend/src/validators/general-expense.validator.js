import Joi from 'joi'

export const newGeneralExpenseSchema = Joi.object({
  season_id: Joi.number().required(),
  purpose: Joi.string().required(),
  amount: Joi.number().required(),
  narration: Joi.string().optional().allow('', null),
})

export const updateGeneralExpenseSchema = newGeneralExpenseSchema.fork(
  Object.keys(newGeneralExpenseSchema.describe().keys),
  (s) => s.optional()
)
