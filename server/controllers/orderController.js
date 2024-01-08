const Order = require("../models/orderModel");
const helper = require("../utils/helper");
const { ObjectId } = require("mongodb");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { config } = require("process");

module.exports.addOrder = async (req, res) => {
    try {


        res.status(200).send({ success: true, message: "Add Order successfully" });
    } catch (error) {
        res.status(400).send({ success: false, message: "error in addOrder function : ", error });
    }
};