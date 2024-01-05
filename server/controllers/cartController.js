const Cart = require("../models/cartModel");
const helper = require("../utils/helper");
const { ObjectId } = require("mongodb");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { config } = require("process");

module.exports.addToCart = async (req, res) => {
    try {
        const { _id } = req.user.data;
        delete req.user; //some security resone delete user data 
        const { quantity, productId } = req.body;
        const alreadyExist = await Cart.findOne({ productId, userId: _id });
        // console.log(alreadyExist);
        // return false;
        const addToCartData = new Cart({
            quantity: quantity,
            productId: productId,
            userId: _id
        });
        if (alreadyExist) {
            const cardId = alreadyExist._id;
            const updatedQuntity = Number(alreadyExist.quantity) + Number(quantity);
            await Cart.updateOne({ _id: cardId }, { $set: { quantity: updatedQuntity } });
        } else {
            await addToCartData.save();
        }

        res.status(200).send({ success: true, message: "Add to cart successfully" });
    } catch (error) {
        res.status(400).send({ success: false, message: "error in addToCart function : ", error });
    }
};

module.exports.getCartItems = async (req, res) => {
    try {
        const { _id } = req.user.data;
        delete req.user; //some security resone delete user data 
        const totalCart = await Cart.find({ userId: new ObjectId(_id) });
        let totalcartItemsCount = 0;
        totalCart.map((cur) => {
            totalcartItemsCount += cur.quantity;
        })
        res.status(200).send({ success: true, message: "complete cart items", data: totalcartItemsCount });
    } catch (error) {
        res.status(400).send({ success: false, message: "error in fetching cart item function : ", error });
    }
}

module.exports.deleteCartItem = async (req, res) => {
    try {
        const { _id } = req.query;
        const findItem = await Cart.findOne({ _id });
        if (findItem) {
            await Cart.deleteOne({ _id });
            res.status(200).send({ success: true, message: "Item delete successfully" });
        } else {
            res.status(400).send({ success: false, message: "Item not Found" });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: "error in deleteCartItem function : ", error });
    }
};



