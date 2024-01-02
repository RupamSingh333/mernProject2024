const express = require("express");
const cartRoute = express();
const bodyParser = require("body-parser");
cartRoute.use(express.static("public"));
cartRoute.use(bodyParser.json());
cartRoute.use(bodyParser.urlencoded({ extended: true }));

const cartController = require("../controllers/cartController");

//contactUs Route
cartRoute.post(
    "/add-to-cart",
    cartController.addToCart
);

module.exports = cartRoute;