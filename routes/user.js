const express = require("express");
const UserRoute = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require('../models/usermodel');

UserRoute.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        const hashedPassword = await bcrypt.hash(password, 7);
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
            address,
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });

    }
    catch (error) {
        console.log(error);
    }
});

UserRoute.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ "msg": "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ "msg": "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.Jwt_secret,{
            expiresIn: '1d',
        });
        res.status(201).send({"msg":"Logged In Successfully", "token": token});
    }
    catch (error) {
        console.log(error);
    }
});

UserRoute.patch("/api/user/:id/reset", async (req, res) => {
    try {
        const {id} = req.params;
        const { currentPassword, newPassword } = req.body;
        const user = await UserModel.findById({_id:id});

        if (!user) {
            return res.status(404).json({ "msg": "User not Present" });
        }

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({ "msg": "Invalid password" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 7);
        user.password = hashedPassword;
        await user.save();
        res.status(201).send("Password reset successfully");
    } 
    catch (error) {
        console.log(error);
    }
});

module.exports = {UserRoute};
