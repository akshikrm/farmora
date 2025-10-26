class UserError extends Error {
	constructor(message) {
		super(message)
		this.name = "UserError"
	}
}


export class InvalidUsernameError extends UserError {
	constructor(username) {
		super(`username ${username} is invalid`)
		this.code = "INVALID_USERNAME"
	}
}


export class UserNotFoundError extends UserError {
	constructor(username) {
		super(`user ${username} not found`)
		this.code = "USER_NOT_FOUND"
	}
}


export class InvalidCredentialError extends UserError {
	constructor(username) {
		super(`invalid password for user ${username}`)
		this.code = "UNAUTHORIZED"
	}
}



