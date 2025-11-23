import Joi from 'joi'

export const newManageSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).required(),
  status: Joi.number().integer().required(),
  package_id: Joi.number().integer().optional(),
})

export const newStaffMemberSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).required(),
  status: Joi.number().integer().required(),
  role_ids: Joi.array().items(Joi.number().integer()).required(),
})

export const updateNewStaffSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  status: Joi.number().integer().required(),
})
