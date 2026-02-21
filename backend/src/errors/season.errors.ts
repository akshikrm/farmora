class SeasonError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SeasonError'
  }
}

export class SeasonNotFoundError extends SeasonError {
  constructor(SeasonID) {
    super(`Season ${SeasonID} not found`)
    this.code = 'SEASON_NOT_FOUND'
    this.statusCode = 404
  }
}
