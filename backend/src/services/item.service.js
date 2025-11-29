import { ItemNotFoundError } from '#errors/item.errors'
import ItemModel from '#models/item'
import userRoles from '#utils/user-roles'
import { Op } from 'sequelize'
import logger from '#utils/logger'

const create = async (payload, currentUser) => {
  payload.active = 'active'
  logger.debug({ payload, currentUser }, 'Creating item: raw input')
  if (currentUser.user_type === userRoles.staff.type) {
    payload.master_id = currentUser.master_id
  } else {
    payload.master_id = currentUser.id
  }
  logger.debug(
    { resolved_master_id: payload.master_id },
    'Resolved master owner id'
  )

  logger.info({ item: payload }, 'Creating item')
  const newItem = await ItemModel.create(payload)
  logger.info({ new_item_id: newItem.id }, 'Item created')
  return newItem
}

const getAll = async (payload, currentUser) => {
  const { page, limit, ...filter } = payload
  const offset = (page - 1) * limit

  logger.debug(
    { payload, actor_id: currentUser.id },
    'Fetching items: raw query payload'
  )

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type == -userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  logger.debug(
    {
      filter,
      page,
      limit,
    },
    'Fetching items: raw query payload'
  )

  const { count, rows } = await ItemModel.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
  })

  logger.info(
    { actor_id: currentUser.id, page, limit, count, filter },
    'Items Fetched'
  )

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

  logger.debug({ filter }, 'Getting item by id')

  const itemRecord = await ItemModel.findOne({ where: filter })
  if (!itemRecord) {
    throw new ItemNotFoundError(itemId)
  }

  logger.info(
    {
      item_id: itemRecord.id,
      actor_id: currentUser.id,
    },
    'Item retreived by id'
  )

  return itemRecord
}

const updateById = async (id, payload, currentUser) => {
  logger.debug(
    { item_id: id, updated_data: payload, actor_id: currentUser.id },
    'Updating item: raw payload'
  )

  logger.info(
    {
      item_id: id,
      updated_keys: Object.keys(payload),
      actor_id: currentUser.id,
    },
    'Updating item'
  )
  const itemRecord = await getById(id, currentUser)
  await itemRecord.update(payload)
  logger.info({ item_id: itemRecord.id }, 'Item updated')
}

const deleteById = async (id, currentUser) => {
  logger.debug(
    { item_id: id, actor_id: currentUser.id },
    'Deleting item: resolving record'
  )
  const itemRecord = await getById(id, currentUser)
  await itemRecord.destroy()
  logger.info({ item_id: id, actor_id: currentUser.id }, 'Item Deleted')
}

const itemService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
}

export default itemService
