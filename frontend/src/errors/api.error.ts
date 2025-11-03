type ErrorResponse = {
  message: string;
  name: string;
  code: string;
};

class APIError extends Error {
  code: string;
  constructor(err: ErrorResponse) {
    super(err.message);
    this.name = err.name;
    this.code = err.code;

    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export default APIError;
