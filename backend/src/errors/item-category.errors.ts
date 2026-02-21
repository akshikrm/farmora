class ItemCategoryError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ItemCategoryError'
  }
}

export class ItemCategoryNotFoundError extends ItemCategoryError {
  constructor(itemCategoryId) {
    super(`Item category ${itemCategoryId} not found`)
    this.code = 'ITEM_CATEGORY_NOT_FOUND'
    this.statusCode = 404
  }
}
