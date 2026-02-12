import { ItemAssignmentNotFoundError } from '#errors/item.errors'
import PurchaseBatchAssignmentModel from '#models/purchasebatchassignment'
import logger from '#utils/logger'

const create = async (payload) => {
  logger.info({ payload }, 'Assigning item to batch: raw input')
  const newRecord = await PurchaseBatchAssignmentModel.create(payload)
  logger.debug({ item: newRecord }, 'Assigned item to batch: raw response')

  logger.info(
    {
      item_assignment_id: newRecord.id,
      ...payload,
    },
    'Assigned item to batch'
  )

  return newRecord
}

const getOneByBatchAndPurchaseId = async (batchId, purchaseId) => {
  logger.debug(
    { batchId, itemId: purchaseId },
    'Getting assignment by batch and item'
  )
  const record = await PurchaseBatchAssignmentModel.findOne({
    where: {
      purchase_id: purchaseId,
      batch_id: batchId,
    },
  })
  if (!record) {
    logger.debug(
      { batchId, itemId: purchaseId },
      'Assignment not found for batch and item'
    )
    return null
  }

  logger.info({ assignment: record }, 'Assignment found')
  return record
}

const updateByBatchIdAndPurchaseId = async (payload) => {
  const { purchase_id, batch_id, quantity } = payload
  logger.debug({ payload }, 'Updating assignment quantity')
  const record = await getOneByBatchAndPurchaseId(batch_id, purchase_id)
  if (!record) {
    throw new ItemAssignmentNotFoundError(batch_id, purchase_id)
  }
  const updatedRecord = await record.update({
    quantity,
  })

  logger.info({ updated: updatedRecord }, 'Updated assignment quantity')
  return updatedRecord
}

const purchaseBatchAssignmentService = {
  create,
  getOneByBatchAndPurchaseId,
  updateByBatchIdAndPurchaseId,
}

export default purchaseBatchAssignmentService
