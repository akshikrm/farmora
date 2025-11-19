import Joi from 'joi'

const seasonSchema = Joi.object({
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

const validateSeason = (req, res, next) => {
  const { error } = seasonSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({
      status: false,
      errors: error.details.map((err) => err.message),
    })
  }

  next()
}

const farmSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  place: Joi.string().allow('').optional(),
  capacity: Joi.string().allow('').optional(),
})

const validateFarm = (req, res, next) => {
  const { error } = farmSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({
      status: false,
      errors: error.details.map((err) => err.message),
    })
  }

  next()
}

const itemSchema = Joi.object({
  master_id: Joi.number().integer().required(),
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().required(),
  status: Joi.number().optional(),
})

const validateItem = (req, res, next) => {
  const { error } = itemSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({
      status: false,
      errors: error.details.map((err) => err.message),
    })
  }

  next()
}

const VendorSchema = Joi.object({
  master_id: Joi.number().integer().required(),
  name: Joi.string().min(3).max(100).required(),
  phone: Joi.string().optional(),
  email: Joi.string().min(3).max(100).optional(),
  address: Joi.string().optional(),
  opening_balance: Joi.optional(),
})

const validateVendor = (req, res, next) => {
  const { error } = VendorSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({
      status: false,
      errors: error.details.map((err) => err.message),
    })
  }

  next()
}

const batchSchema = Joi.object({
  master_id: Joi.number().integer().required(),
  farm_id: Joi.number().integer().required(),
  season_id: Joi.number().integer().required(),
  name: Joi.string().min(3).max(100).required(),
  status: Joi.number().optional(),
})

const validateBatch = (req, res, next) => {
  const { error } = batchSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({
      status: false,
      errors: error.details.map((err) => err.message),
    })
  }

  next()
}

export {
  validateSeason,
  validateFarm,
  validateItem,
  validateVendor,
  validateBatch,
}
