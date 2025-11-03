class NetworkError extends Error {
  code: string;
  constructor(message: string) {
    super(message);
    this.name = "Network Error";
    this.code = "Network_Error";

    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export default NetworkError;
