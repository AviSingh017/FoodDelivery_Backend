const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String,
    },
    menu: [
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            image: String,
        },
    ],
});

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);

module.exports = { RestaurantModel };