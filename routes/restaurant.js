const express = require("express");
const RestaurantRoute = express.Router();
// RestaurantRoute.use(express.json());
const { RestaurantModel } = require("../models/restaurantmodel");

RestaurantRoute.post("/api/restaurants", async (req, res) => {
    try{
      const {name,address,menu} = req.body;
  
      const restaurant = new RestaurantModel({
        name,
        address,
        menu,
      });
  
      await restaurant.save();
      res.status(201).send({ message: "Restaurant added Successfully" });

    }catch(error){
      console.log(error);
    }
  });
  

RestaurantRoute.get("/api/restaurants", async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find();
        res.status(200).send(restaurants);
    }
    catch (error) {
        console.log(error);
    }
});

RestaurantRoute.get("/api/restaurants/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const restaurant = await RestaurantModel.findById({ _id: id });

        if (!restaurant) {
            return res.status(404).send({ "msg": "Restaurant not Present" });
        }

        res.status(200).send(restaurant);

    }
    catch (error) {
        console.log(error);
    }
});

RestaurantRoute.get("/api/restaurants/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const restaurant = await RestaurantModel.findById({ _id: id }, 'menu');

        if(!restaurant) {
            return res.status(404).send({ "msg": "Restaurant not Present" });
        }

        res.status(200).send(restaurant.menu);

    }
    catch(error) {
        console.log(error);
    }
});

RestaurantRoute.post("/api/restaurants/:id/menu", async (req, res) => {
    try{
        const {id} = req.params;
        const { name, description, price, image } = req.body;

        const restaurant = await RestaurantModel.findById({ _id: id }, 'menu');

        if (!restaurant) {
            return res.status(404).send({ "msg": "Restaurant not Present" });
        }

        const menuitem = {
            name,
            description,
            price,
            image
        };

        restaurant.menu.push(menuitem);
        await restaurant.save();
        res.status(201).send({ "msg": "Item added to menu Successfully" });

    }
    catch(error) {
        console.log(error);
    }
});
RestaurantRoute.delete("/api/restaurants/:id/menu/:id", async (req, res) => {
    try{
        const {id, menuId} = req.params;

        const restaurant = await RestaurantModel.findById(id, 'menu');

        if(!restaurant){
            return res.status(404).send({ "msg": "Restaurant not found" });
        }

        const menuitem = restaurant.menu.id(menuId);

        if (!menuitem){
            return res.status(404).send({ "msg": "Item not found" });
        }

        menuitem.remove();
        await restaurant.save();

        res.sendStatus(200).send({ "msg": "Menu item deleted Successfully" });
    } 
    catch(error){
        console.log(error);
    }
});

module.exports = {RestaurantRoute}
