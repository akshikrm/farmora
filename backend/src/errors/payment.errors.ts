class PaymentError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PaymentError'
  }
}

export class PackageNotFoundError extends PaymentError {
  constructor(subscriptionID, userID) {
    super(
      `payment failed for subscription_id ${subscriptionID} for user ${userID}`
    )
    this.code = 'PAYMENT_FAILED'
    this.statusCode = 404
  }
}
