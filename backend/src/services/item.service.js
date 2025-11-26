import { ItemNotFoundError } from '#errors/item.errors'
import ItemModel from '#models/item'
import userRoles from '#utils/user-roles'
import { Op } from 'sequelize'

const create = async (payload, currentUser) => {
  payload.active = 'active'
  if (currentUser.user_type === userRoles.staff.type) {
    payload.master_id = currentUser.master_id
  } else {
    payload.master_id = currentUser.id
  }
  const newItem = await ItemModel.create(payload)
  return newItem
}

const getAll = async (payload, currentUser) => {
  const { page, limit, ...filter } = payload
  const offset = (page - 1) * limit

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type == -userRoles.manager.type) {
    filter.master_id = currentUser.id
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

const getById = async (itemId, currentUser) => {
  const filter = { id: itemId }
  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const itemRecord = await ItemModel.findOne({ where: filter })
  if (!itemRecord) {
    throw new ItemNotFoundError(itemId)
  }
  return itemRecord
}

const updateById = async (id, payload, currentUser) => {
  const itemRecord = await getById(id, currentUser)
  await itemRecord.update(payload)
}

const deleteById = async (id, currentUser) => {
  const itemRecord = await getById(id, currentUser)
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
