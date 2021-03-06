const Product = require('../models/product')
const mongoose = require('mongoose')

exports.get_all_products = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }


            res.status(200).json(response)
        }

        ).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

}

exports.products_create_product = (req, res, next) => {
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage:req.file.path
    })

    product.save().then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Created product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    method: 'POST',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        })
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });


}

exports.products_get_single_product = (req, res, next) => {
    let id = req.params.productId
    Product.findById(id).select('name _id price productImage').exec().then(doc => {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/'
            }
        })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })

}

exports.products_edit_product = (req, res, next) => {
    const id = req.params.productId
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'product updated',
                request: {
                    type: 'GET',
                    request: 'http://localhost:3000/products/' + id
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.products_delete_product =  (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id })
        .exec()
        .then(result => {

            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    body: { name: 'String', price: 'Number' }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}