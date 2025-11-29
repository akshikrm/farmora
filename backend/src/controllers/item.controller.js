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
}

export default itemController
