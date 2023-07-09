const notify = require('../../config/notify')
const ErrorResponse = require('../utils/ErrorResponse')




const errorHandler = (err, req, res, next) => {
    console.log(err);
    var error = { ...err }
    console.log(error)
    if (error.name === "CastError") {
        let message = notify.ERROR_CASTERROR;
        error = new ErrorResponse(404, message);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "SEVER ERROR"
    })
}

module.exports = errorHandler;;