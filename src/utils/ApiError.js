class ApiError extends Error {
  constructor(
    messsage = "Something went wrong",
    statusCode,
    errors = [],
    stack = ""
  ) {
    super(messsage);
    this.message = messsage;
    this.data = null;
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
