class FarmError extends Error {
	constructor(message) {
		super(message)
		this.name = "FarmError"
	}
}


export class FarmNotFoundError extends FarmError {
	constructor(farmID) {
		super(`Farm ${farmID} not found`)
		this.code = "FARM_NOT_FOUND"
		this.statusCode = 404
	}
}

