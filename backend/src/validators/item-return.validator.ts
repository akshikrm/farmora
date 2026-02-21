import Joi from 'joi'

export const newItemReturnSchema = Joi.object({
  return_type: Joi.string().valid('vendor', 'batch').required(),
  item_category_id: Joi.number().required(),
  date: Joi.date().required(),
  from_batch: Joi.number().required(),
  to_batch: Joi.number().when('return_type', {
    is: 'batch',
    then: Joi.required(),
    otherwise: Joi.optional().allow(null),
  }),
  to_vendor: Joi.number().when('return_type', {
    is: 'vendor',
    then: Joi.required(),
    otherwise: Joi.optional().allow(null),
  }),
  quantity: Joi.number().min(1).required(),
  rate_per_bag: Joi.number().required(),
  total_amount: Joi.number().required(),
  status: Joi.string()
    .valid('pending', 'completed', 'cancelled')
    .optional()
    .default('completed'),
})

export const updateItemReturnSchema = newItemReturnSchema.fork(
  Object.keys(newItemReturnSchema.describe().keys),
  (s) => s.optional()
)
