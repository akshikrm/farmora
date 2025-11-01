class ItemError extends Error {
	constructor(message) {
		super(message)
		this.name = "ItemError"
	}
}


export class ItemNotFoundError extends ItemError {
	constructor(ItemID) {
		super(`Item ${ItemID} not found`)
		this.code = "ITEM_NOT_FOUND"
		this.statusCode = 404
	}
}

