class AuthError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthError'
  }
}

export class TokenExpiredError extends AuthError {
  constructor() {
    super(`token has expired`)
    this.code = 'TOKEN_EXPIRED'
    this.statusCode = 401
  }
}

export class InvalidTokenError extends AuthError {
  constructor() {
    super(`token is invalid`)
    this.code = 'INVALID_TOKEN'
    this.statusCode = 401
  }
}

export class PermissionDeniedError extends AuthError {
  constructor() {
    super(`permission denied`)
    this.code = 'PERMISSION_DENIED'
    this.statusCode = 403
  }
}

export class UnauthorizedError extends AuthError {
  constructor() {
    super('unauthorized')
    this.code = 'UNAUTHORIZED'
    this.statusCode = 401
  }
}

export class MissingTokenError extends AuthError {
  constructor() {
    super(`token is missing`)
    this.code = 'MISSING_TOKEN'
    this.statusCode = 401
  }
}
