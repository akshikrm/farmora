import {
  ItemAssignmentNotFoundError,
  ItemAssignQuantityError,
  ItemNotFoundError,
  ItemQuantityUnderflowError,
} from '#errors/item.errors'
import VendorModel from '#models/vendor'
import ItemModel from '#models/items.model'
import PurchaseModel from '#models/purchase'
import userRoles from '#utils/user-roles'
import { Op } from 'sequelize'
import logger from '#utils/logger'
import purchaseBatchAssignmentService from '#services/purchase-batch-assignment'
import PurchaseBatchAssignmentModel from '#models/purchasebatchassignment'
import BatchModel from '#models/batch'
import SeasonModel from '#models/season'
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

  payload.name = 'test'
  logger.info({ item: payload }, 'Creating item')
  const newItem = await PurchaseModel.create(payload)
  logger.info({ new_purchase_id: newItem.id }, 'Purchase created')

  if (payload.batch_id) {
    await purchaseBatchAssignmentService.create({
      batch_id: payload.batch_id,
      purchase_id: newItem.id,
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

  const items = await PurchaseModel.findAll({
    where: whereClause,
    include: [
      { model: VendorModel, as: 'vendor', required: true },
      { model: ItemModel, as: 'category', required: false },
    ],
  })
  return items
}

const reassignToAnotherBatch = async (payload, currentUser) => {
  const { item_id, source_batch_id, target_batch_id, quantity } = payload

  const sourceAssignment =
    await purchaseBatchAssignmentService.getOneByBatchAndPurchaseId(
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
    await purchaseBatchAssignmentService.getOneByBatchAndPurchaseId(
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
    await purchaseBatchAssignmentService.getOneByBatchAndPurchaseId(
      batch_id,
      item_id
    )

  const itemRecord = await getById(item_id, currentUser)
  const qty = itemRecord.quantity - quantity
  if (qty < 0) {
    throw new ItemQuantityUnderflowError(qty)
  }

  let record = null
  if (assignmentRecord) {
    payload.quantity = assignmentRecord.quantity + payload.quantity
    logger.debug({ payload }, 'Assignment exists, updating: raw input')
    record =
      await purchaseBatchAssignmentService.updateByBatchIdAndPurchaseId(payload)
  } else {
    logger.debug({ payload }, 'Assignment do not exist, creating: raw input')
    record = await purchaseBatchAssignmentService.create(payload)
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

  const { count, rows } = await PurchaseModel.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
    attributes: {
      exclude: ['category_id', 'vendor_id'],
    },
    include: [
      { model: ItemModel, as: 'category', required: false },
      { model: VendorModel, as: 'vendor', required: false },
      {
        model: PurchaseBatchAssignmentModel,
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

// IntegrationBook get route
// For admin he needs to see all farms and batches under the farm. For a manager of staff he needs to see only his farms and batches
// There will be three parameters farm_id, start_date and end_date
// I need to get two sets of data from the database
// They are items with payment_type as credit/paid which will have the filter applied
const getInegrationBook = async (filter, currentUser) => {
  const { farm_id, start_date, end_date } = filter
  const whereClause = {}

  const batches = await batchService.getAll(
    { farm_id: farm_id, page: 1, limit: 100 },
    currentUser
  )
  if (batches.total === 0) {
    return { credit_items: [], paid_items: [] }
  }
  const batchIds = batches.data.map((batch) => batch.id)

  whereClause.batch_id = { [Op.in]: batchIds }

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

  const finalFilter = {
    where: whereClause,
    include: [
      { model: VendorModel, as: 'vendor', required: true },
      {
        model: ItemModel,
        as: 'category',
        required: true,
        where: { type: 'integration' },
      },
    ],
  }

  finalFilter.where.payment_type = 'credit'
  logger.debug(
    { test: finalFilter },
    'Getting credit items for integration book'
  )
  const creditItems = await PurchaseModel.findAll(finalFilter)
  finalFilter.where.payment_type = 'paid'
  logger.debug({ test: finalFilter }, 'Getting paid items for integration book')
  const paidItems = await PurchaseModel.findAll(finalFilter)
  logger.info('Integration book data fetched')
  return { credit_items: creditItems, paid_items: paidItems }
}

const getById = async (itemId, currentUser, opts = {}) => {
  const filter = { id: itemId }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  logger.debug({ filter }, 'Getting item by id')
  const itemRecord = await PurchaseModel.findOne({
    where: filter,
    attributes: {
      exclude: ['category_id', 'vendor_id', 'batch_id'],
    },
    include: [
      { model: ItemModel, as: 'category', required: false },
      { model: VendorModel, as: 'vendor', required: false },
      { model: BatchModel, as: 'batch', required: false },
      { model: SeasonModel, as: 'season', required: false },
    ],
  })
  logger.debug({ itemRecord }, 'Item retrevied')
  if (!itemRecord) {
    throw new ItemNotFoundError(itemId)
  }

  logger.info(
    {
      purchase_id: itemRecord.id,
      actor_id: currentUser.id,
    },
    'Purchase retrieved by id'
  )

  if (opts.asJSON) {
    const item = itemRecord.toJSON()
    const assignment =
      await purchaseBatchAssignmentService.getOneByBatchAndPurchaseId(
        itemRecord.batch.id,
        itemRecord.id
      )
    return {
      ...item,
      assign_quantity: assignment.quantity,
    }
  }

  return itemRecord
}

const calculateNewQty = (assignQuantity, currentAssignQty) => {
  const assignQtyDifference = assignQuantity - currentAssignQty
  if (assignQtyDifference < 0) {
    return payload.quantity + assignQtyDifference * -1
  } else {
    return payload.quantity - assignQtyDifference
  }
}

const updateById = async (id, payload, currentUser) => {
  logger.debug(
    { purchase_id: id, updated_data: payload, actor_id: currentUser.id },
    'Updating purchase: raw payload'
  )

  if (payload.quantity < payload.assign_quantity) {
    throw new ItemAssignQuantityError(payload.assign_quantity, payload.quantity)
  }

  const purchaseRecord = await getById(id, currentUser)

  const currentAssignment =
    await purchaseBatchAssignmentService.getOneByBatchAndPurchaseId(
      payload.batch_id,
      id
    )

  if (currentAssignment) {
    await purchaseBatchAssignmentService.updateByBatchIdAndPurchaseId({
      purchase_id: id,
      batch_id: payload.batch_id,
      quantity: payload.assign_quantity,
    })
    payload.quantity = calculateNewQty(
      payload.assign_quantity,
      currentAssignment.quantity
    )
  } else {
    const newAssignment = await purchaseBatchAssignmentService.create({
      purchase_id: id,
      batch_id: payload.batch_id,
      quantity: payload.assign_quantity,
    })
    payload.quantity = calculateNewQty(
      payload.assign_quantity,
      newAssignment.quantity
    )
  }

  const updatedPurchaseRecord = await purchaseRecord.update(payload)
  return updatedPurchaseRecord
}

const deleteById = async (id, currentUser) => {
  logger.debug(
    { purchase_id: id, actor_id: currentUser.id },
    'Deleting item: resolving record'
  )
  const itemRecord = await getById(id, currentUser)
  await itemRecord.destroy()
  logger.info({ purchase_id: id, actor_id: currentUser.id }, 'Purchase Deleted')
}

const purchaseService = {
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

export default purchaseService
