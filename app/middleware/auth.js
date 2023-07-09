const asyncHandler = require('./async')
const ErrorResponse = require('../utils/ErrorResponse')
const system = require('../.././config/system')
var jwt = require('jsonwebtoken')
const User = require('../models/Users')


exports. protect = asyncHandler((req, res, next) => {
    let token = ''
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }else if(req.cookies.token){
        token = req.cookies.token
    }
    if (!token) return next(new ErrorResponse(res, 401, 'Vui lòng đăng nhập tài khoản'))

    try {
        req.user_id = jwt.verify(token, system.JWT_SECRET)
        next()
    } catch (error) {
        return next(new ErrorResponse(res, 401, 'Vui lòng đăng nhập tài khoản'))
    }
})
exports.authorize = (...roles)=>{
    return (req, res, next) => {
        console.log(roles);
        User.findOne({_id: req.user_id.id}).then((user) => {
            
            if(!roles.includes(user.role)){
                return next(new ErrorResponse(res,403, 'Bạn không có quyền truy cập'))
            }
            next()
        })
    }
}