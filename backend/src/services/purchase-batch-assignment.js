import { ItemAssignmentNotFoundError } from '@errors/item.errors'
import PurchaseBatchAssignmentModel from '@models/purchasebatchassignment'

const create = async (payload) => {
  const newRecord = await PurchaseBatchAssignmentModel.create(payload)
  return newRecord
}

const getOneByBatchAndPurchaseId = async (batchId, purchaseId) => {
  const record = await PurchaseBatchAssignmentModel.findOne({
    where: {
      purchase_id: purchaseId,
      batch_id: batchId,
    },
  })
  if (!record) {
    return null
  }

  return record
}

const updateByBatchIdAndPurchaseId = async (payload) => {
  const { purchase_id, batch_id, quantity } = payload
  const record = await getOneByBatchAndPurchaseId(batch_id, purchase_id)
  if (!record) {
    throw new ItemAssignmentNotFoundError(batch_id, purchase_id)
  }
  const updatedRecord = await record.update({
    quantity,
  })

  return updatedRecord
}

const purchaseBatchAssignmentService = {
  create,
  getOneByBatchAndPurchaseId,
  updateByBatchIdAndPurchaseId,
}

export default purchaseBatchAssignmentService
