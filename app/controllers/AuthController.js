const User = require('../models/Users')
const system = require('../../config/system')
const sendEmail = require('../utils/sendEmail')
var bcrypt = require('bcryptjs')
const crypto = require('crypto');
class AuthController {
    register(req, res, next) {
        const auth = new User(req.body)
        auth.save().then((auth) => {
            // const token = auth.getSignedJwtToken()
            res.status(201).json({
                success: true,
                message: 'Bạn đã đăng ký tài khoản thành công',
                // token: token,
                data: auth
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Bạn đăng ký tài khoản không thành công',
                error: error
            })
        })
    }
    login(req, res, next) {
        const email = req.body.email
        const password = req.body.password
        if (!email || !password) {
            res.status(404).json({
                success: false,
                message: 'Không được để trống email hoặc password'
            })
        } else {
            User.findOne({ email: email }).then((user) => {
                const token = user.getSignedJwtToken()
                const passwords = bcrypt.compareSync(password, user.password)
                if (token) {
                    if (passwords) {
                        saveCookieResponse(res, 201, token)
                    }
                }

                if (!passwords) {
                    res.status(401).json({
                        success: false,
                        message: 'Email hoặc password không chính xác'
                    })
                }
            }).catch((error) => {
                res.status(401).json({
                    success: false,
                    message: 'Email hoặc password không chính xác'
                })
            })
        }
    }
    me(req, res, next) {
        // console.log(req.user_id);
        User.findOne({ _id: req.user_id.id }).then((currentUser) => {
            res.status(200).json({
                success: true,
                message: currentUser
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Không tìm được tài khoản nào'
            })
        })
    }
    logout(req, res, next) {
        res.status(200).cookie('token', 'none', {
            expires: new Date(
                Date.now() + 10 * 1000
            ),
            httpOnly: true
        }).json({
            success: true,
            message: 'Bạn đã đăng xuất thành công'
        })
    }
    forgotPassword(req, res, next) {
        let email = req.body.email
        User.findOne({ email: email }).then(user => {
            if (!user) {
                res.status(401).json({
                    success: true,
                    message: 'Email không tồn tại'
                })
            } else {
                const resetToken = user.resetPassword()
                user.save()
                const ressetURL = `/api/v1/auth/resetPassword/${resetToken}`
                const message = `Truy cập vào link để đổi pass: ${ressetURL}`

                sendEmail({
                    email: user.email,
                    subject: 'Thay đổi Password',
                    message
                }).then(() => {
                    res.status(200).json({
                        success: true,
                        message: 'Vui lòng check mail của bạn'
                    })
                }).catch((error) => {
                    user.resetPassToken = undefined,
                        user.resetPassTokenExp = undefined,
                        user.save()
                    res.status(401).json({
                        success: true,
                        message: 'Gửi mail không thành công',
                        error
                    })
                })
            }

        }).catch((error) => {
            res.status(401).json({
                success: false,
                message: 'Email không tồn tại'
            })
        })
    }
    resetPassword(req, res, next) {
        let password = req.body.password
        let resetToken = req.params.resetToken

        const resetPassToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        User.findOne({
            resetPassToken: resetPassToken,
            resetPassTokenExp: { $gt: Date.now() }
        }).then((user) => {
            if (!user) {
                res.status(403).json({
                    success: false,
                    message: 'Không tìm được token phù hợp'
                })
            }
            user.password = password
            user.resetPassToken = undefined
            user.resetPassTokenExp = undefined

            user.save().then(() => {
                res.status(200).json({
                    success: true,
                    message: 'Đã đổi mật khẩu thành công',
                    user
                })
            })


        })
    }
}
function saveCookieResponse(res, statusCode, token) {
    const options = {
        expires: new Date(
            Date.now() + system.COOKIE_EXP * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        message: 'Đăng nhập thành công',
        token
    })
}
module.exports = new AuthController