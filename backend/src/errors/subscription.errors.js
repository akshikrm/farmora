class SubscriptionError extends Error {
	constructor(message) {
		super(message)
		this.name = "SubscriptionError"
	}
}


export class SubsriptionAlreadyActiveError extends SubscriptionError {
	constructor(userID) {
		super(`subscription already active for user ${userID}`)
		this.code = "SUBSCRIPTION_ACTIVE"
		this.statusCode = 400
	}
}


export class SubsriptionInActiveError extends SubscriptionError {
	constructor(userID) {
		super(`subscription inactive for user ${userID}`)
		this.code = "SUBSCRIPTION_INACTIVE"
		this.statusCode = 403
	}
}
