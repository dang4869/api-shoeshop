class ErrorResponse extends Error {
    constructor(res,statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
      res.status(statusCode).json({
        success: false,
        message: message
      })
    }
  }
  module.exports =  ErrorResponse