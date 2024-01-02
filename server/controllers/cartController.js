const Cart = require("../models/cartModel");
const helper = require("../utils/helper");
const { ObjectId } = require("mongodb");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { config } = require("process");

module.exports.addToCart = async (req, res) => {
    try {
        const { productName, price, quantity, productId, userId } = req.body;
        const addToCartData = new Cart({
            productName: productName,
            price: price,
            quantity: quantity,
            productId: productId,
            userId: userId
        });
        const saveCartData = await addToCartData.save();
        res.status(200).send({ success: true, message: "Add to cart successfully" });
    } catch (error) {
        res.status(400).send({ success: false, message: "error in addToCart function : ", error });
    }
};



