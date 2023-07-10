const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    status: { type: String, required: true },
});

const OrderModel = mongoose.model("Order",OrderSchema);

module.exports = {OrderModel};