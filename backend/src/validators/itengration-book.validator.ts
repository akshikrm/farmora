import Joi from 'joi'

export const newIntegationBookSchema = Joi.object({
	farm_id: Joi.number().required(),
	date: Joi.date().required(),
	amount: Joi.number().required(),
	payment_type: Joi.string().valid('credit', 'paid').required(),
})

export const updateIntegrationBookSchema = newIntegationBookSchema.fork(
	Object.keys(newIntegationBookSchema.describe().keys),
	(s) => s.optional()
)
