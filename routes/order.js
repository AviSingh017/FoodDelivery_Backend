const express = require("express");
const OrderRoute = express.Router();
const {OrderModel} = require('../models/ordermodel');

OrderRoute.post("/api/orders", async (req, res) => {
  try {
    const {
      userId,
      restaurantId,
      items,
      totalPrice,
      deliveryAddress,
    } = req.body;

    const order = new OrderModel({
      user: userId,
      restaurant: restaurantId,
      items,
      totalPrice,
      deliveryAddress,
      status: 'Placed',
    });

    await order.save();

    res.status(201).json({ "msg": "Order placed Successfully" });
  } catch (error) {
    console.log(error);
  }
});

OrderRoute.get("/api/orders", async (req, res) => {
  try {
    const {id} = req.params;

    const order = await OrderModel.findById(id)
      .populate('user', 'name email')
      .populate('restaurant', 'name');

    if (!order) {
      return res.status(404).json({ "msg": "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.log(error);
  }
});

OrderRoute.patch("", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json('Order not found');
    }

    order.status = status;
    await order.save();

    res.status(200).send({ "msg": "Order status updated" });
  } catch (error) {
    console.log(error);
  }
});

module.exports={OrderRoute};
