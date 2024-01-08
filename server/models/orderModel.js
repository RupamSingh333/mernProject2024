const mongoose = require("mongoose");
const Order = mongoose.Schema({

},
    { timestamps: true });

module.exports = mongoose.model("Order", Order);