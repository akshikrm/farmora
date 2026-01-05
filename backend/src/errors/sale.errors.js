class SaleError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SaleError'
  }
}

export class SaleNotFoundError extends SaleError {
  constructor(SaleID) {
    super(`Sale ${SaleID} not found`)
    this.code = 'SALE_NOT_FOUND'
    this.statusCode = 404
  }
}
