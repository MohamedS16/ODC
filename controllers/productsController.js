const Product = require('./../models/productsModel')
const {validationResult} = require('express-validator')

const addProduct = async (req,res)=>{
    try{
        let newProductData = req.body
        let productMainImg = await req.files
        console.log(productMainImg);
        
        let validationErrors = validationResult(req)
        if(!validationErrors.isEmpty()){
            throw(validationErrors)
        }
        await Product.create({...newProductData})
        res.json({
            msg : 'Done'
        })
    }catch(er){
        res.json(er)
    }
}

const getAllProducts = async (req,res)=>{
    let products = await Product.find({})
    res.json(products)
}

const getSingleProduct = async (req,res)=>{
    let id = req.params.id
    let intendeProduct = await Product.findOne({_id : id })
    res.json(intendeProduct || {msg : "Not Found"})

}

const updateProduct = async (req,res)=>{
    let id = req.params.id
    let newProductData = req.body
    let updated = await Product.updateOne({_id : id},{...newProductData, $inc : {__v : 1}})
    res.json(updated)
}

const deleteProduct = async (req,res)=>{
    let id = req.params.id

    let deleted = await Product.deleteOne({_id : id})

    res.json(deleted)
}

const aggregations = async (req,res)=>{
    let page = req.query.page || 1
    let limit = 2
    let skip = (page - 1) * limit  

    let agg = await Product.find({}).limit(limit).skip(skip)

    res.json(agg)
}

module.exports = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    aggregations
}