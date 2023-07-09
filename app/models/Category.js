const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categorys = new Schema({
    name: { type: String, required: [true, 'Không được để trống trường name'] },
    title: { type: String, required: [true, 'Không được để trống trường title'] },
    slug: { type: String, required: [true, 'Không được để trống trường slug'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

Categorys.virtual('product',{
    ref: 'products',
    localField: '_id',
    foreignField: 'category.id'
})
Categorys.set('toObject', {virtuals: true})
Categorys.set('toJSON', {virtuals: true})
module.exports = mongoose.model('category', Categorys)