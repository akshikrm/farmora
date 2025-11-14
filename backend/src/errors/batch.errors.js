class BatchError extends Error {
	constructor(message) {
		super(message)
		this.name = "BatchError"
	}
}


export class BatchNotFoundError extends BatchError {
	constructor(BatchID) {
		super(`Batch ${BatchID} not found`)
		this.code = "BATCH_NOT_FOUND"
		this.statusCode = 404
	}
}

