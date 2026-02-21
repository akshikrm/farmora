import ValidationError from '@errors/validation.errors'

const validateQuery = (schema) => (req, res, next) => {
  console.assert(schema, 'schema required')
  const { error, value } = schema
    .prefs({
      errors: {
        wrap: {
          label: false,
        },
      },
    })
    .validate(req.query, {
      abortEarly: false,
    })
  if (error) {
    throw new ValidationError(error)
  }
  req.query = value
  next()
}

export default validateQuery
