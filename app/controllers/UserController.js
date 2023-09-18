const Users = require("../models/Users");

class UserController {
    index(req, res, next) {
        let querys = req.query
        // coppy query
        const queryFind = { ...querys };

        let find, select, sort;

        // Create fields remove
        let removeFields = ['select', 'sort', 'page', 'limit'];

        // Remove fields 
        removeFields.forEach(query => delete queryFind[query]);

        // Create query string
        // console.log(queryFind);
        let queryStr = JSON.stringify(queryFind);

        // replace 
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|or)\b/g, find => `$${find}`);

        //parse
        find = JSON.parse(queryStr);
        find.username = new RegExp(req.query.username, 'i')
        find.email = new RegExp(req.query.email, 'i')
        // console.log(find);
        // select fields
        if (querys.select) {
            select = querys.select.split(',').join(' ');
        }

        // sort fields
        if (querys.sort) {
            sort = querys.sort.split(',').join(' ');
        }

        //pagination
        const page = parseInt(querys.page);
        const limit = parseInt(querys.limit);
        const skip = (page - 1) * limit;
        Users.find(find).select(select).sort(sort).skip(skip).limit(limit)
            .then((users) => {
                res.status(201).json({
                    success: true,
                    count: users.length,
                    data: users
                })
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'Không tìm được danh mục nào',
                    error: error
                })
            })
    }
    add(req, res, next) {
        Users.create(req.body).then((user) => {
            res.status(200).json({
                success: true,
                message: 'Thêm mới tài khoản thành công',
                user
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Thêm mới tài khoản thất bại'
            })
        })
    }
    edit(req, res, next) {
        Users.findById({ _id: req.params.id }).then((user) => {
            const userNew = user.updateNew(req.body)
            Users.updateOne({ _id: req.params.id }, userNew)
                .then((user) => {
                    res.status(200).json({
                        success: true,
                        message: 'Đã cập nhật tài khoản thành công',
                        userNew
                    })
                }).catch((error) => {
                    res.status(500).json({
                        success: false,
                        message: 'Cập nhật tài khoản thất bại',
                        error
                    })
                })
        })

    }
    delete(req, res, next) {
        // console.log(req.user_id);
        if(req.user_id.id === req.params.id){
            res.status(500).json({
               success: false,
               message: 'Bạn không thể tự xóa chính mình'
            })
        }else{
            Users.deleteOne({ _id: req.params.id }).then((user) => {
                res.status(200).json({
                    success: true,
                    message: 'Đã xóa tài khoản thành công'
                })
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'Đã xóa tài khoản thất bại'
                })
            })
        }
     
    }
}
module.exports = new UserController