class ValidationError extends Error {
  constructor(err) {
    const { details, message } = err
    super(message)
    this.name = 'ValidaionError'
    this.statusCode = 400
    this.code = 'VALIDATE_ERROR'
    this.error = details.map((e) => {
      const path = e.path.join('')
      return {
        field: path,
        message: e.message,
        type: e.type,
      }
    })
  }
}

export default ValidationError
