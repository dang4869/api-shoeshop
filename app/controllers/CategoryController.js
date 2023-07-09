const Category = require('../models/Category')
const Product = require('../models/Product')
class CategoryController {
    index(req, res, next) {
        Category.find({})
            .populate({ path: 'product', select: 'name' })
            .then((categorys) => {
                res.status(201).json({
                    success: true,
                    count: categorys.length,
                    data: categorys
                })
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'Không tìm được danh mục nào'
                })
            })
    }
    showProductCategory(req, res, next) {
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
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find => `$${find}`);

        //parse
        find = JSON.parse(queryStr);
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
        const page = parseInt(querys.page) || 1;
        const limit = parseInt(querys.limit) || 6;
        const skip = (page - 1) * limit;
        Object.assign(find, { "category.id": req.params.id })
        Product
            .find(find)
            .select(select)
            .sort(sort)
            .skip(skip).limit(limit)
            .then((products) => {
                res.status(200).json({
                    success: true,
                    count: products.length,
                    data: products
                })
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'Không tìm thấy sản phẩm nào'
                })
            })
    }
    showAllProductCategory(req, res, next) {
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
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find => `$${find}`);

        //parse
        find = JSON.parse(queryStr);
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
        const page = parseInt(querys.page) || 1;
        const limit = parseInt(querys.limit) || 6;
        const skip = (page - 1) * limit;
        Product
            .find(find)
            .select(select)
            .sort(sort)
            .skip(skip).limit(limit)
            .then((products) => {
                res.status(200).json({
                    success: true,
                    count: products.length,
                    data: products
                })
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'Không tìm thấy sản phẩm nào'
                })
            })
    }
    add(req, res, next) {
        Category.create(req.body).then((category) => {
            res.status(200).json({
                success: true,
                message: 'Đã thêm danh mục sản phẩm thành công',
                data: category
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Thêm sản danh mục sản phẩm không thành công',
                error: error
            })
        })
    }
    edit(req, res, next) {
        Category.updateOne({ _id: req.params.id }, req.body).then((category) => {
            res.status(200).json({
                success: true,
                message: 'Đã cập nhật danh mục sản phẩm thành công',
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Cập nhật danh mục sản phẩm không thành công'
            })
        })
    }
    delete(req, res, next) {
       Category.deleteOne({ _id: req.params.id }).then((category) => {
          res.status(200).json({
            success: true,
            message: 'Đã xóa danh mục sản phẩm thành công'
          })
       }).catch((error)=>{
        res.status(500).json({
            success: false,
            message: 'Bạn xóa danh mục sản phẩm không thành công'
        })
       })
    }
}

module.exports = new CategoryController