import Joi from 'joi'

export const newWorkingCostSchema = Joi.object({
  season_id: Joi.number().required(),
  purpose: Joi.string().required(),
  amount: Joi.number().required(),
  payment_type: Joi.string().valid('income', 'expense').required(),
})

export const updateWorkingCostSchema = newWorkingCostSchema.fork(
  Object.keys(newWorkingCostSchema.describe().keys),
  (s) => s.optional()
)
