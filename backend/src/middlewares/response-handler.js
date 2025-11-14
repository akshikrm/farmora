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
	next()
}


export default errorHandler
