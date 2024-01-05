const express = require("express");
const cartRoute = express();
const bodyParser = require("body-parser");
cartRoute.use(express.static("public"));
cartRoute.use(bodyParser.json());
cartRoute.use(bodyParser.urlencoded({ extended: true }));
const auth = require("../middleware/auth");


const cartController = require("../controllers/cartController");

//Add To Cart Route
cartRoute.post(
    "/add-to-cart", auth,
    cartController.addToCart
);

//Get Cart item Route
cartRoute.get(
    "/get-cart-items", auth,
    cartController.getCartItems
);

//Delete Cart item Route
cartRoute.get(
    "/delete-cart-item", auth,
    cartController.deleteCartItem
);

module.exports = cartRoute;