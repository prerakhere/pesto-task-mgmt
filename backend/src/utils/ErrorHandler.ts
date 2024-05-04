export default class BaseError extends Error {
  httpStatusCode: number;

  constructor(httpStatusCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.httpStatusCode = httpStatusCode;
    Error.captureStackTrace(this);
  }
}