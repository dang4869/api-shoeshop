const Product = require('../models/Product')

class ProductController {
    index(req, res, next) {
        // if (req.query.name) {
        //     Product.find({
        //         "$or": [
        //             { name: { $regex: req.query.name, $options: "i" } }
        //         ]
        //     }).then((products) => {
        //         res.status(201).json({
        //             success: true,
        //             count: products.length,
        //             data: products
        //         })
        //     }).catch((error) => {
        //         res.status(500).json({
        //             error,
        //             success: false,
        //             message: 'Không tìm thấy sản phẩm nào'
        //         })
        //     })
        // } else {
        let querys = req.query
        // coppy query
        const queryFind = { ...querys };
        // if(req.query.name !== '') objWhere.name = new RegExp(params.keyword, 'i');
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
        find.name = new RegExp(req.query.name, 'i')
        find.special = new RegExp(req.query.special, 'i')
        find.brand = new RegExp(req.query.brand, 'i')
        find.size = new RegExp(req.query.size, 'i')
        find.color = new RegExp(req.query.color, 'i')
        // select fields
        if (querys.select) {
            select = querys.select.split(',').join(' ');
            console.log(select);
        }

        // sort fields
        if (querys.sort) {
            sort = querys.sort.split(',').join(' ');
        }

        //pagination
        const page = parseInt(querys.page)
        const limit = parseInt(querys.limit)
        const skip = (page - 1) * limit;
        Product
            .find(find)
            .select(select)
            .sort(sort)
            .skip(skip).limit(limit)
            .then((products) => {
                res.status(200).json({
                    success: true,
                    page: page,
                    count: products.length,
                    data: products
                })
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'Không tìm thấy sản phẩm nào'
                })
            })
        // }

    }
    showOne(req, res, next) {
        Product.findOne({ _id: req.params.id }).then((product) => {
            res.status(200).json({
                success: true,
                data: product
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Không tìm thấy sản phẩm nào'
            })
        })
    }
    add(req, res, next) {
        Product.create(req.body).then((product) => {
            res.status(200).json({
                success: true,
                message: 'Thêm sản phẩm thành công',
                data: product
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Thêm sản phẩm không thành công',
                error: error
            })
        })
    }
    edit(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body).then((product) => {
            res.status(200).json({
                success: true,
                message: 'Đã cập nhật sản phẩm thành công'
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Cập nhật sản phẩm thất bại'
            })
        })
    }
    delete(req, res, next) {
        Product.deleteOne({ _id: req.params.id }).then((product) => {
            res.status(200).json({
                success: true,
                message: 'Đã xóa sản phẩm thành công'
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Xóa sản phẩm không thành công'
            })
        })
    }
    event(req, res, next) {
        if (req.params.type != 'like' && req.params.type != 'dislike') {
            return res.status(404).json({
                success: false,
                message: 'Sai trạng thái cập nhật'
            })
        }
        if (req.params.type === 'like') {
            Product.findOne({ _id: req.params.id }).then(product => {
                Product.findByIdAndUpdate(req.params.id, { like: product.like + 1 })
                    .then(res.status(200).json({
                        success: true,
                        data: product
                    }))

            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'Cập nhật không thành công',
                })
            })
        }
        if (req.params.type === 'dislike') {
            Product.findOne({ _id: req.params.id }).then(product => {
                Product.findByIdAndUpdate(req.params.id, { like: product.like - 1 })
                    .then(res.status(200).json({
                        success: true,
                        data: product
                    }))

            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'Cập nhật không thành công',
                })
            })
        }
    }
}
module.exports = new ProductController

