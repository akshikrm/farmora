class VendorError extends Error {
	constructor(message) {
		super(message)
		this.name = "VendorError"
	}
}


export class VendorNotFoundError extends VendorError {
	constructor(VendorID) {
		super(`Vendor ${VendorID} not found`)
		this.code = "VENDOR_NOT_FOUND"
		this.statusCode = 404
	}
}

