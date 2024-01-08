const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");

module.exports.createOrder = async (req, res) => {
  const { name, email, _id } = req.user.data;
  const { totalAmount, paymentMode, orderItems, deliveryDetails } = req.body;

  try {
    const orderItemIds = [];

    for (const cur of orderItems) {
      const createOrderItem = new OrderItem({
        productId: cur.productId,
        quantity: cur.quantity,
        price: cur.price,
        productName: cur.productName,
      });

      const savedOrderItem = await createOrderItem.save();
      orderItemIds.push(savedOrderItem._id);
    }

    const createOrder = new Order({
      orderItems: orderItemIds,
      customerName: name,
      email: email,
      totalAmount: totalAmount,
      paymentMode: paymentMode,
      userId: _id,
      deliveryDetails: deliveryDetails,
    });

    const savedOrder = await createOrder.save();

    res.status(200).send({
      success: true,
      message: "Order added successfully",
      data: savedOrder._id,
    });
  } catch (error) {
    console.error("Error in createOrder function:", error);
    res.status(400).send({
      success: false,
      message: "Error in createOrder function",
      error,
    });
  }
};
