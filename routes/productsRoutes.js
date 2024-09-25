const express = require('express')
const router = express.Router()
const productsController = require('./../controllers/productsController')
const productsValidation = require('./../validations/productsValidation')
const usersMiddleware = require('./../middlewares/usersMiddleware')
const upload = require('./../utilities/productImageUpload')

router.route('/')
    .get(productsController.getAllProducts)
    .post(
        upload.fields([{name : 'productImage',maxCount: 3},{name : 'otherImages'}]),
        // productsValidation(),
        productsController.addProduct)

router.route('/:id')
    .get(productsController.getSingleProduct)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)

router.get('/agg', productsController.aggregations)

module.exports = router