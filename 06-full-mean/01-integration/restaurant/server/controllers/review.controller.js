const Restaurant = require('mongoose').model('Restaurant');
const Review = require('mongoose').model('Review');
const { Http } = require('@status/codes');

module.exports = {
    index(req, res) {
        const { restaurant_id } = req.params;
        Restaurant.findById(restaurant_id).populate({ path: 'reviews', options: { sort: { 'star': 'ascending' } } })
            .then(restaurants => res.json(restaurants))
            .catch(error => res.status(Http.InternalServerError).json(error))
    },
    create(req, res) {
        const { restaurant_id: restaurantId } = req.params;
        Review.create(req.body)
            .then(review => {
                Restaurant.findByIdAndUpdate(restaurantId, { $push: { reviews: review } }, { runValidators: true })
                    .then(restaurant => res.json(restaurant))
                    .catch(error => {
                        console.log(error.errors)
                        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                        res.status(Http.UnprocessableEntity).json(errors);
                    })
            })
            .catch(error => {
                console.log(error.errors)
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    },

    destroy(req, res) {
        const { review_id } = req.params;
        Review.findByIdAndRemove(review_id)
            .then(removedReview => res.json(removedReview))
            .catch(error => res.status(Http.ResetContent).json(error))
    },

    update(req, res) {
        const { review_id } = req.params;
        Review.findByIdAndUpdate(review_id, req.body, { new: true })
            .then(updatedReview => res.json(updatedReview))
            .catch(error => {
                const errors = Object.keys(error.errors).map(key => error.errors[key].message);
                res.status(Http.UnprocessableEntity).json(errors);
            })
    }

}