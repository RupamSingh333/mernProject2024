const express = require("express");
const orderRoute = express();
const bodyParser = require("body-parser");
orderRoute.use(express.static("public"));
orderRoute.use(bodyParser.json());
orderRoute.use(bodyParser.urlencoded({ extended: true }));
const auth = require("../middleware/auth");


const orderController = require("../controllers/orderController");

//Add To Cart Route
orderRoute.post(
    "/create-order", auth,
    orderController.createOrder
);



module.exports = orderRoute;