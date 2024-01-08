const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const helper = require("../utils/helper");
const { ObjectId } = require("mongodb");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { config } = require("process");

module.exports.createOrder = async (req, res) => {
    try {
        // console.log(req.body);

        var orderItemIds = [];
        req.body.orderItems.map(async (cur) => {

            const createOrderItem = new OrderItem({
                productId: cur.productId,
                quantity: cur.quantity,
                price: cur.price,
                productName: cur.productName
            });
            const saveCategory = await createOrderItem.save();
            // console.log(saveCategory._id);
            orderItemIds = [saveCategory._id];
        });

        const createOrderItem = new Order({
            productId: cur.productId,
            quantity: cur.quantity,
            orderItems: [orderItemIds],
            productName: cur.productName
        });
        const saveCategory = await createOrderItem.save();


        res.status(200).send({ success: true, message: "Add Order successfully", data: req.body });
    } catch (error) {
        res.status(400).send({ success: false, message: "error in create Order function : ", error });
    }
};