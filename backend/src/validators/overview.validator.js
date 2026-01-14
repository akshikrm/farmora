import Joi from 'joi'

export const batchOverviewSchema = Joi.object({
  batch_id: Joi.number().integer().required(),
})
