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
	}
}
