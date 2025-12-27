import itemService from '#services/item.service'
import asyncHandler from '#utils/async-handler'
import logger from '#utils/logger'

const create = async (req, res) => {
  const payload = req.body

  logger.info({ payload }, 'Create item request recevied')
  const newItem = await itemService.create(payload, req.user)

  res.success(newItem, {
    message: 'Configuration item created successfully',
    statusCode: 201,
  })
}

const getIntegrationBook = async (req, res) => {
  console.log('req.query', req.query)
  const filter = {
    farm_id: req.query.farm_id,
  }

  if (!filter.farm_id) {
    return res.success([], {
      message: 'Inventory book fetched successfully',
    })
  }

  if (req.query.start_date) {
    filter.start_date = req.query.start_date
  }
  if (req.query.end_date) {
    filter.end_date = req.query.end_date
  }

  const inventoryBookRecords = await itemService.getInegrationBook(
    filter,
    req.user
  )
  res.success(inventoryBookRecords, {
    message: 'Inventory book fetched successfully',
  })
}

const getPurchaseBook = async (req, res) => {
  const filter = {
    vendorId: req.query.vendor_id,
  }

  if (req.query.start_date) {
    filter.start_date = req.query.start_date
  }
  if (req.query.end_date) {
    filter.end_date = req.query.end_date
  }

  const purchaseBookRecords = await itemService.getPurchaseBook(
    filter,
    req.user
  )
  res.success(purchaseBookRecords, {
    message: 'Purchase book fetched successfully',
  })
}

const reassignItemToBatch = async (req, res) => {
  const payload = req.body
  const record = await itemService.reassignToAnotherBatch(payload, req.user)
  res.success(record, { message: 'successfully reassigned', status: 201 })
}

const assingItemToBatch = async (req, res) => {
  const payload = req.body

  const assignedItem = await itemService.assignItemToBatch(payload, req.user)

  res.success(assignedItem, { message: 'Item assigned to batch' })
}

const getAll = async (req, res) => {
  const filter = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
  }

  if (req.query.master_id) {
    filter.master_id = req.query.master_id
  }
  if (req.query.status) {
    filter.status = req.query.status
  }
  if (req.query.name) {
    filter.name = req.query.name
  }

  if (req.query.category_id) {
    filter.category_id = req.query.category_id
  }

  if (req.query.vendor_id) {
    filter.vendor_id = req.query.vendor_id
  }
  if (req.query.batch_id) {
    filter.batch_id = req.query.batch_id
  }

  if (req.query.start_date) {
    filter.start_date = req.query.start_date
  }
  if (req.query.end_date) {
    filter.end_date = req.query.end_date
  }

  const itemRecords = await itemService.getAll(filter, req.user)
  res.success(itemRecords, {
    message: 'Configuration items fetched successfully',
  })
}

const getById = async (req, res) => {
  const { item_id } = req.params
  const itemRecord = await itemService.getById(item_id, req.user)
  res.success(itemRecord, {
    message: 'Configuration item details fetched successfully',
  })
}

const updateById = async (req, res) => {
  const { item_id } = req.params
  const payload = req.body
  logger.info(
    { payload, actor_id: req.user.id },
    'Update item request recevied'
  )
  await itemService.updateById(item_id, payload, req.user)
  res.success(null, { message: 'Configuration item updated successfully' })
}

const deleteById = async (req, res) => {
  const { item_id } = req.params
  await itemService.deleteById(item_id, req.user)
  res.success(null, {
    message: 'Configuration item deleted successfully',
    statusCode: 204,
  })
}

const itemController = {
  create: asyncHandler(create),
  getAll: asyncHandler(getAll),
  getById: asyncHandler(getById),
  updateById: asyncHandler(updateById),
  deleteById: asyncHandler(deleteById),
  assingItemToBatch: asyncHandler(assingItemToBatch),
  reassignItemToBatch: asyncHandler(reassignItemToBatch),
  getPurchaseBook: asyncHandler(getPurchaseBook),
  getIntegrationBook: asyncHandler(getIntegrationBook),
}

export default itemController
