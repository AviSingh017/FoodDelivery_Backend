const express = require("express");
const app = express();
require("dotenv").config();

const {connection} = require("./config/db");
const {UserRoute} = require("./routes/user");
const {RestaurantRoute} = require("./routes/restaurant");
const {OrderRoute} = require('./routes/order');
const {auth} = require("./middleware/auth");

app.use(express.json());

app.use("/", RestaurantRoute);
app.use(auth);
app.use("/", UserRoute);
app.use("/", OrderRoute);

app.get("/", (req,res)=>{
    res.send("Server is Working");
})

app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("Connected to DB");
    }
    catch(err){
        console.log(err);
    }
    console.log("Server is Running on port 7000");
});
