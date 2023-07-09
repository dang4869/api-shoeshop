const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
    name: { type: String, require: [true, 'Không được để trống trường name'] },
    color: [{ type: String, require: [true, 'Không được để trống trường color'] }],
    price: { type: Number, require: [true, 'Không được để trống trường price'] },
    price_old: { type: Number, require: [true, 'Không được để trống trường price_old'] },
    description: { type: String, require: [true, 'Không được để trống trường description'] },
    like: { type: Number, require: [true, 'Không được để trống trường like'] },
    category: {
        id: {
            type: Schema.Types.String,
            ref: 'category',
            required: [true, 'Không được để trống trường category']
        },
        name: String
    },
    special: { type: String },
    brand: { type: String, require: [true, 'Không được để trống trường brand'] },
    size: [{ type: String, require: [true, 'Không được để trống trường size'] }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('products', Products)