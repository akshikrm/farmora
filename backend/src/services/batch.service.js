import { Op } from 'sequelize'
import BatchModel from '#models/batch'
import { BatchNotFoundError } from '#errors/batch.errors'

const create = async (payload) => {
  const newBatch = await BatchModel.create(payload)
  return newBatch
}

const getAll = async (payload) => {
  const { page, limit, ...filter } = payload
  const offset = (page - 1) * limit

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
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

const getById = async (id) => {
  const batchRecord = await BatchModel.findOne({ where: { id } })
  if (!batchRecord) {
    throw new BatchNotFoundError(id)
  }
  return batchRecord
}

const updateById = async (id, payload) => {
  const batchRecord = await getById(id)
  await batchRecord.update(payload)
}

const deleteById = async (id) => {
  const batchRecord = await getById(id)
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
