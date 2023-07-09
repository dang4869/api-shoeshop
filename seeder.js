const db = require('./config/database')
const fs = require('fs')
db.connect()

const ProductSchema = require('./app/models/Product')
const CategorySchema = require('./app/models/Category')


const Product = JSON.parse(fs.readFileSync(`${__dirname}/app/_data/product.json`, 'utf8'))
const category = JSON.parse(fs.readFileSync(`${__dirname}/app/_data/category.json`, 'utf8'))


const importData = async ()=>{
    try{
        await ProductSchema.create(Product)
        await CategorySchema.create(category)
        console.log('Import Data Success')
        process.exit()
    }catch(error){
       console.log(error)
    }
}

const deleteData = async ()=>{
    try{
        await ProductSchema.deleteMany({})
        await CategorySchema.deleteMany({})
        console.log('Delete Data Success');
        process.exit()
    }catch(error){
       console.log(error)
    }
}

if(process.argv[2] === '-i'){
    importData()
}else if(process.argv[2] === '-d'){
    deleteData()
}