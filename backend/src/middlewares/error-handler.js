const errorHandler = (_, res, next) => {
	res.success = (data, meta = { statusCode: 200 }) => {
		const statusCode = meta.statusCode || 200;
		const message = meta.message || "Request successful";
		res.status(statusCode).json({
			status: "success",
			message: message,
			data: data,
			error: null
		})
	}

	res.error = (error) => {
		const statusCode = error.statusCode || 500;
		const message = error.message || "Something went wrong";
		const name = error.name || "InternalServerError";
		const code = error.code || "INTERNAL_SERVER_ERROR";

		res.status(statusCode).json({
			status: "failed",
			data: null,
			message,
			error: {
				message: message,
				name: name,
				code: code,
			},
		})
	}
	next()
}


export default errorHandler
