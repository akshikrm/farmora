import Joi from 'joi'

export const batchOverviewSchema = Joi.object({
  batch_id: Joi.number().integer().required(),
})

export const seasonOverviewSchema = Joi.object({
  season_id: Joi.number().integer().required(),
})
