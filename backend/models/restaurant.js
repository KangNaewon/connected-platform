const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    restaurant_name: String,
    city: String,
    location: String,
    type: String,
    rating: Number,
    phone: String,
    img: String,
    price: String,
    description: String,
    media: Array,
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);