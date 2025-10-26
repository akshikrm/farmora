class PackageError extends Error {
	constructor(message) {
		super(message)
		this.name = "PackageError"
	}
}


export class PackageNotFoundError extends PackageError {
	constructor(packageID) {
		super(`package ${packageID} not found`)
		this.code = "PACKAGE_NOT_FOUND"
	}
}

