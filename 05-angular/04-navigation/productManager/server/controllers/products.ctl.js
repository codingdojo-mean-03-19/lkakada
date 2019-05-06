const Product = require('mongoose').model('Product');
const { Http } = require('@status/codes')

module.exports = {
    index(_req, res) {
        Product.find({})
            .then(products => res.json(products))
            .catch(error => response.status(Http.InternalServerError).json(error));
    },
    create(req, res) {
        Product.create(req.body)
            .then(product => {
                res.json({ message: "Success", data: product })
            })
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    },
    destory(req, res) {
        const { product_id: productID } = req.params;
        Product.findByIdAndRemove(productID)
            .then(product => res.json(product))
            .catch(error => res.status(Http.ResetContent).json(error));
    },
    update(req, res) {
        const { product_id: productID } = req.params;
        Product.findByIdAndUpdate(productID, req.body, { new: true })
            .then(updatedProduct => res.json(updatedProduct))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    },
    show(req, res) {
        const { product_id: productID } = req.params;
        Product.findById(productID)
            .then(product => res.json(product))
            .catch(error => res.status(Http.UnavailableForLegalReasons).json(error));
    }

}