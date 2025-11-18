class RoleError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SeasonError'
  }
}

export class RoleNotFoundError extends RoleError {
  constructor(roleId) {
    super(`Role ${roleId} not found`)
    this.code = 'ROLE_NOT_FOUND'
    this.statusCode = 404
  }
}

export class RoleAlreadyExistsError extends RoleError {
  constructor(roleId) {
    super(`Role ${roleId} already exists`)
    this.code = 'Duplicate_ROLE'
    this.statusCode = 409
  }
}
