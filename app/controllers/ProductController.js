const Product = require('../models/Product')

class ProductController {
    index(req, res, next) {
        Product.find().then((products) => {
            res.status(201).json({
                success: true,
                count: products.length,
                data: products
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Không tìm được sản phẩm phù hợp'
            })
        })
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
                console.log(product.like);
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

