class ItemError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ItemError'
  }
}

export class ItemNotFoundError extends ItemError {
  constructor(ItemID) {
    super(`Item ${ItemID} not found`)
    this.code = 'ITEM_NOT_FOUND'
    this.statusCode = 404
  }
}

export class ItemAssignQuantityError extends ItemError {
  constructor(qty, assignQty) {
    super(`Assign quantity: ${assignQty} must be less than quantity: ${qty}`)
    this.code = 'QUANTITY_ERROR'
    this.statusCode = 400
  }
}

export class ItemQuantityUnderflowError extends ItemError {
  constructor(qty) {
    super(`Item quantity cannot be less than 0, current: ${qty}`)
    this.code = 'QUANTITY_ERROR'
    this.statusCode = 400
  }
}

export class ItemAssignmentNotFoundError extends ItemError {
  constructor(batchId, itemId) {
    super(
      `Assignment with batch_id: ${batchId} and item_id: ${itemId} not found`
    )
    this.code = 'ASSIGNMENT_NOT_FOUND'
    this.statusCode = 404
  }
}
