var notify = require('../../config/notify')
var ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (error, req, res, next) => {
    // console.log(err);
    // let err = { ...error }
    if (error.name === "CastError") {
        let message = notify.ERROR_CASTERROR;
        error = new ErrorResponse(res, 404, message);
    }

    // if(error.name === 'TypeError'){
    //     res.status(401).json({
    //         success : false,
    //         message : 'Vui lòng đăng nhập tài khoản'
    //     })
    // }

    res.status(error.statusCode || 500).json({
        success : false,
        message : error.message || "SEVER ERROR"
    })
}

module.exports = errorHandler;