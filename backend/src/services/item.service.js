import {
  ItemAssignmentNotFoundError,
  ItemAssignQuantityError,
  ItemNotFoundError,
  ItemQuantityUnderflowError,
} from '#errors/item.errors'
import VendorModel from '#models/vendor'
import ItemCategoryModel from '#models/item_categories.models'
import ItemModel from '#models/item'
import userRoles from '#utils/user-roles'
import { Op } from 'sequelize'
import logger from '#utils/logger'
import itemBatchAssignmentService from '#services/item-batch-assignment'
import ItemBatchAssignmentModel from '#models/itembatchassignment'
import BatchModel from '#models/batch'
import dayjs from 'dayjs'
import batchService from '#services/batch.service'

const create = async (payload, currentUser) => {
  const { quantity, assign_quantity } = payload
  if (assign_quantity) {
    const qty = quantity - assign_quantity
    if (qty < 0) {
      throw new ItemAssignQuantityError(qty, assignQty)
    }
    payload.quantity = qty
  }

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

  if (payload.batch_id) {
    await itemBatchAssignmentService.create({
      batch_id: payload.batch_id,
      item_id: newItem.id,
      quantity: payload.assign_quantity,
    })
  }

  return newItem
}

const getPurchaseBook = async (filter, currentUser) => {
  const { vendorId, start_date, end_date } = filter
  const whereClause = {
    vendor_id: vendorId,
  }

  if (start_date) {
    whereClause.createdAt = { [Op.gte]: dayjs(start_date) }
  }
  if (end_date) {
    whereClause.createdAt = { [Op.lte]: dayjs(end_date) }
  }

  if (currentUser.user_type === userRoles.staff.type) {
    whereClause.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    whereClause.master_id = currentUser.id
  }

  const items = await ItemModel.findAll({
    where: whereClause,
    include: [
      { model: VendorModel, as: 'vendor', required: true },
      { model: ItemCategoryModel, as: 'category', required: false },
    ],
  })
  return items
}

const reassignToAnotherBatch = async (payload, currentUser) => {
  const { item_id, source_batch_id, target_batch_id, quantity } = payload

  const sourceAssignment =
    await itemBatchAssignmentService.getOneByBatchAndItemId(
      source_batch_id,
      item_id
    )

  if (!sourceAssignment) {
    throw new ItemAssignmentNotFoundError(source_batch_id, source_item_id)
  }

  if (sourceAssignment.quantity < quantity) {
    throw new ItemQuantityUnderflowError(quantity)
  }

  const targetAssignment =
    await itemBatchAssignmentService.getOneByBatchAndItemId(
      target_batch_id,
      item_id
    )
  if (targetAssignment) {
    await targetAssignment.update({
      quantity: sourceAssignment.quantity + quantity,
    })
  } else {
    await assignItemToBatch(
      { item_id, batch_id: target_batch_id, quantity },
      currentUser,
      { reassign: true }
    )
  }

  return await sourceAssignment.update({
    quantity: sourceAssignment.quantity - quantity,
  })
}

const assignItemToBatch = async (payload, currentUser, opts = {}) => {
  const { item_id, batch_id, quantity } = payload

  const assignmentRecord =
    await itemBatchAssignmentService.getOneByBatchAndItemId(batch_id, item_id)

  const itemRecord = await getById(item_id, currentUser)
  const qty = itemRecord.quantity - quantity
  if (qty < 0) {
    throw new ItemQuantityUnderflowError(qty)
  }

  let record = null
  if (assignmentRecord) {
    payload.quantity = assignmentRecord.quantity + payload.quantity
    logger.debug({ payload }, 'Assignment exists, updating: raw input')
    record = await itemBatchAssignmentService.updateByBatchIdAndItemId(payload)
  } else {
    logger.debug({ payload }, 'Assignment do not exist, creating: raw input')
    record = await itemBatchAssignmentService.create(payload)
  }

  if (!opts.reassign) {
    await updateById(item_id, { quantity: qty }, currentUser)
  }
  return record
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
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  if (filter.start_date || filter.end_date) {
    filter.createdAt = {}
    if (filter.start_date) {
      filter.createdAt[Op.gte] = new Date(filter.start_date)
      delete filter.start_date
    }
    if (filter.end_date) {
      filter.createdAt[Op.lte] = new Date(filter.end_date)
      delete filter.end_date
    }
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
    attributes: {
      exclude: ['category_id', 'vendor_id'],
    },
    include: [
      { model: ItemCategoryModel, as: 'category', required: false },
      { model: VendorModel, as: 'vendor', required: false },
      {
        model: ItemBatchAssignmentModel,
        as: 'assignments',
        required: false,
        attributes: { exclude: ['item_id', 'createdAt', 'updatedAt'] },
      },
    ],
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

  console.log(filter)
  logger.debug({ filter }, 'Getting item by id')
  const itemRecord = await ItemModel.findOne({
    where: filter,
    attributes: {
      exclude: ['category_id', 'vendor_id', 'batch_id'],
    },
    include: [
      { model: ItemCategoryModel, as: 'category', required: false },
      { model: VendorModel, as: 'vendor', required: false },
      { model: BatchModel, as: 'batch', required: false },
    ],
  })
  logger.debug({ itemRecord }, 'Item retrevied')
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

  const itemRecord = await getById(id, currentUser)

  // Handle assign_quantity changes
  if (payload.assign_quantity !== undefined && payload.batch_id) {
    const oldAssignment =
      await itemBatchAssignmentService.getOneByBatchAndItemId(
        payload.batch_id,
        id
      )

    const oldAssignedQty = oldAssignment ? oldAssignment.quantity : 0
    const newAssignedQty = payload.assign_quantity
    const quantityDifference = newAssignedQty - oldAssignedQty

    // Check if we have enough quantity available
    const availableQty = itemRecord.quantity + oldAssignedQty
    const newRemainingQty = availableQty - newAssignedQty

    if (newRemainingQty < 0) {
      throw new ItemAssignQuantityError(newAssignedQty, availableQty)
    }

    // Update or create batch assignment
    if (oldAssignment) {
      await oldAssignment.update({ quantity: newAssignedQty })
    } else if (newAssignedQty > 0) {
      await itemBatchAssignmentService.create({
        batch_id: payload.batch_id,
        item_id: id,
        quantity: newAssignedQty,
      })
    }

    // Update item quantity
    payload.quantity = newRemainingQty
  }

  logger.info(
    {
      item_id: id,
      updated_keys: Object.keys(payload),
      actor_id: currentUser.id,
    },
    'Updating item'
  )
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
  assignItemToBatch,
  reassignToAnotherBatch,
  getPurchaseBook,
  getInegrationBook,
}

export default itemService
