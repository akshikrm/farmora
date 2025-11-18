import { ItemNotFoundError } from '#errors/item.errors'
import ItemModel from '#models/item'
import { Op } from 'sequelize'

const create = async (payload) => {
  const newItem = await ItemModel.create(payload)
  return newItem
}

const getAll = async (payload) => {
  const { page, limit, ...filter } = payload
  const offset = (page - 1) * limit

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }

  const { count, rows } = await ItemModel.findAndCountAll({
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
  const itemRecord = await ItemModel.findOne({ where: { id } })
  if (!itemRecord) {
    throw new ItemNotFoundError(id)
  }
  return itemRecord
}

const updateById = async (id, payload) => {
  const itemRecord = await getById(id)
  await itemRecord.update(payload)
}

const deleteById = async (id) => {
  const itemRecord = await getById(id)
  await itemRecord.destroy()
}

const itemService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
}

export default itemService
