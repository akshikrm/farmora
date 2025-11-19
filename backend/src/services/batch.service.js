import { Op } from 'sequelize'
import BatchModel from '#models/batch'
import { BatchNotFoundError } from '#errors/batch.errors'
import userRoles from '#utils/user-roles'

const create = async (payload, currentUser) => {
  payload.name = payload.name.trim()
  payload.status = 'active'
  payload.master_id = currentUser.id
  const newBatch = await BatchModel.create(payload)
  return newBatch
}

const getAll = async (payload, currentUser) => {
  const { page, limit, ...filter } = payload
  const offset = (page - 1) * limit

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }
  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const { count, rows } = await BatchModel.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
  })

  return {
    page,
    limit,
    total: count,
    data: rows,
  }
}

const getById = async (batchId, currentUser) => {
  const filter = { id: batchId }
  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const batchRecord = await BatchModel.findOne({ where: filter })
  if (!batchRecord) {
    throw new BatchNotFoundError(batchId)
  }
  return batchRecord
}

const updateById = async (batchId, payload, currentUser) => {
  const batchRecord = await getById(batchId, currentUser)
  await batchRecord.update(payload)
}

const deleteById = async (batchId, currentUser) => {
  const batchRecord = await getById(batchId, currentUser)
  await batchRecord.destroy()
}

const batchService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
}

export default batchService
