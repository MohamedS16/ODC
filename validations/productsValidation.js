const {
    body
} = require('express-validator')
const Product = require('./../models/productsModel')

const productsValidation = () => {
    return [
        body('productName').notEmpty().withMessage('Product Name Cant be Empty')
        .custom(async (value) => {
            let products = await Product.findOne({
                productName: value
            })
            if (products) {
                throw ('Product Already Exists')
            }
        }),
        body('productPrice').isFloat({
            min: 0
        }).withMessage('Price Cant BE Zero'),
        body('productCategory').isIn(['food', 'beauty', 'electronics']).withMessage('Category Must Be Test')
    ]
}

module.exports = productsValidation