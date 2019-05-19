const Restaurant = require('mongoose').model('Restaurant');
const { Http } = require('@status/codes');

module.exports = {
    index(_req, res) {
        Restaurant.find({})
            .then(restaurants => res.json(restaurants))
            .catch(error => res.status(Http.InternalServerError).json(error))
    },
    create(req, res) {
        Restaurant.create(req.body)
            .then(restaurant => res.json(restaurant))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    },
    show(req, res) {
        const { restaurant_id } = req.params;
        Restaurant.findById(restaurant_id)
            .then(restaurant => res.json(restaurant))
            .catch(error => res.status(Http.InternalServerError).json(error))
    },
    destroy(req, res) {
        const { restaurant_id } = req.params;
        Restaurant.findByIdAndRemove(restaurant_id)
            .then(removedRestaurant => res.json(removedRestaurant))
            .catch(error => res.status(Http.ResetContent).json(error))
    },
    update(req, res) {
        const { restaurant_id } = req.params;
        Restaurant.findByIdAndUpdate(restaurant_id, req.body, { new: true })
            .then(updatedRestaurant => res.json(updatedRestaurant))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    }
}
