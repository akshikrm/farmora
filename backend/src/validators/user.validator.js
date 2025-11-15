import Joi from 'joi'
import users from '#models/user'

const newUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).required(),
  status: Joi.number().integer().required(),
  package_id: Joi.number().integer().optional(),
})

const newStaffMemberSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).required(),
  status: Joi.number().integer().required(),
})

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).optional(),
  status: Joi.number().integer().required(),
  package_id: Joi.number().integer().optional(),
})

const validateNewUser = async (req, res, next) => {
  const { error } = newUserSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({
      status: false,
      errors: error.details.map((err) => err.message),
    })
  }

  const existingUser = await users.findOne({
    where: { username: req.body.username },
  })

  if (existingUser) {
    return res.status(400).json({
      status: false,
      errors: ['Username already exists. Please choose a different username.'],
    })
  }

  next()
}

export const validateUpdateUser = async (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({
      status: false,
      errors: error.details.map((err) => err.message),
    })
  }

  const existingUser = await users.findOne({
    where: { username: req.body.username },
  })

  if (existingUser) {
    return res.status(400).json({
      status: false,
      errors: ['Username already exists. Please choose a different username.'],
    })
  }

  next()
}

export const validateNewMember = async (req, res, next) => {
  const { error } = newStaffMemberSchema.validate(req.body, {
    abortEarly: false,
  })
  if (error) {
    return res.status(400).json({
      status: false,
      errors: error.details.map((err) => err.message),
    })
  }

  const existingUser = await users.findOne({
    where: { username: req.body.username },
  })

  if (existingUser) {
    return res.status(400).json({
      status: false,
      errors: ['Username already exists. Please choose a different username.'],
    })
  }

  next()
}

export default validateNewUser
