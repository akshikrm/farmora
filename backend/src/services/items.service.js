import { ItemCategoryNotFoundError } from '#errors/item-category.errors'
import VendorModel from '#models/vendor'
import ItemModel from '#models/items.model'
import userRoles from '#utils/user-roles'
import { Op } from 'sequelize'

const create = async (payload, currentUser) => {
  payload.status = 'active'
  if (currentUser.user_type === userRoles.staff.type) {
    payload.master_id = currentUser.master_id
  } else {
    payload.master_id = currentUser.id
  }

  const newItemCategory = await ItemModel.create(payload)
  return newItemCategory
}

const getNames = async (currentUser) => {
  const filter = {}
  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const records = await ItemModel.findAll({
    where: filter,
    attributes: ['id', 'name', 'type'],
    limit: 50,
  })
  return records
}

const getAll = async (payload, currentUser) => {
  const { limit, page, ...filter } = payload
  const offset = (page - 1) * limit

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const { count, rows } = await ItemModel.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
    include: [{ model: VendorModel, as: 'vendor', required: true }],
  })

  return {
    page,
    limit,
    total: count,
    data: rows,
  }
}

const getById = async (itemCategoryId, currentUser) => {
  const filter = {
    id: itemCategoryId,
  }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const itemCategoryRecord = await ItemModel.findOne({
    where: filter,
  })
  if (!itemCategoryRecord) {
    throw new ItemCategoryNotFoundError(itemCategoryId)
  }

  return itemCategoryRecord
}

const updateById = async (itemCategoryId, payload, currentUser) => {
  const itemCategoryRecord = await getById(itemCategoryId, currentUser)
  await itemCategoryRecord.update(payload)
}

const deleteById = async (itemCategoryId, currentUser) => {
  const itemCategory = await getById(itemCategoryId, currentUser)
  itemCategory.destroy()
}

const itemService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  getNames,
}

export default itemService
