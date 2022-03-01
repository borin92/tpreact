const express = require("express");
var bodyParser = require('body-parser')
const userModel = require("../model/UserSchema");
const app = express();


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/", (req, res) => {

    res.json({ message: "Hello from server!" });
});

app.post("/add_user", urlencodedParser, async (req, response) => {
    console.log(req.body);
    const newUser = new userModel({
        name: req.body.name,
        age: req.body.age,

    });

    try {
        await newUser.save();
        response.send(newUser);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await userModel.find({});

    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;