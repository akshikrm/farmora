const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  const name = err.name || 'InternalServerError'
  const code = err.code || 'INTERNAL_SERVER_ERROR'

  const error = { message, name, code }
  if (err.error) {
    error.error = err.error
  }

  res.status(statusCode).json({
    status: 'failed',
    data: null,
    message,
    error: error,
  })
}

export default globalErrorHandler
