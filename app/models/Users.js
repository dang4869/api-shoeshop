const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs')
const validator = require('validator');
var jwt = require('jsonwebtoken');
const { JWT_EXP, JWT_SECRET } = require('../../config/system');
const crypto = require('crypto');

const Users = new Schema({
    username: { type: String, required: [true, 'Không được để trống trường username'] },
    email: {
        type: String,
        required: [true, 'Không được để trống trường email'],
        validate: {
            validator: validator.isEmail,
            messages: 'Email không hợp lệ',
            isAsync: false
        }
    },
    role: { type: String, required: [true, 'Không được để trống trường role'] },
    password: { type: String, required: [true, 'Không được để trống trường password'] },
    resetPassToken: String,
    resetPassTokenExp: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

Users.pre('save', function (next) {
    if (!this.isModified('password')) {
        next();
    }
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})
Users.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this.id }, JWT_SECRET,
        { expiresIn: JWT_EXP }
    )
}

Users.methods.updateNew =  function (userNew) {
    const isMatch = bcrypt.compareSync(userNew.password, this.password)
    if (!isMatch) {
        var salt = bcrypt.genSaltSync(10);
        userNew.password = bcrypt.hashSync(userNew.password, salt);
        return userNew
    }
    userNew.password = this.password
    return userNew
}

Users.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}
Users.methods.resetPassword = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPassToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPassTokenExp = Date.now() + 10 * 60 * 1000
    return resetToken
}
module.exports = mongoose.model('users', Users)