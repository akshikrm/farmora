import Joi from 'joi'

export const newVendorSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().required(),
  opening_balance: Joi.string().min(3).required(),
  vendor_type: Joi.string().valid('seller', 'buyer').required(),
})

export const updateVendorSchema = newVendorSchema.fork(
  Object.keys(newVendorSchema.describe().keys),
  (s) => s.optional()
)
