const mongoose = require('mongoose');
const orderModel = require('../models/orderModel');
const Productmodel = require('../models/productModel');
const catchasyncerror = require('../middlewares/catchasyncerror');
const ErrorHandler = require('../utils/errorHandler');
exports.newOrder = catchasyncerror(async (req, res, next) => {
 const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
 
    const order = await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    });
}
);
exports.getSingleOrder = catchasyncerror(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new ErrorHandler('Invalid order ID', 400));
    }

    const order = await orderModel.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});



exports.getMyOrders = catchasyncerror(async (req, res, next) => {
    const orders = await orderModel.find({ user: req.user._id });

    if (!orders || orders.length === 0) {
        return next(new ErrorHandler('No orders found for this user', 404));
    }

    res.status(200).json({
        success: true,
        orders
    });
});


exports.getAllOrders = catchasyncerror(async (req, res, next) => {
    const orders = await orderModel.find().populate('user', 'name email');

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    if (!orders || orders.length === 0) {
        return next(new ErrorHandler('No orders found', 404));
    }

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    });
});

exports.updateOrder = catchasyncerror(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  console.log("Received update:", req.body, "Order ID:", req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order has already been delivered!", 400));
  }

  for (const orderItem of order.orderItems) {
    if (!orderItem.productId) {
      return next(new ErrorHandler("Missing productId in order item", 400));
    }
    await updateStock(orderItem.productId, orderItem.quantity);
  }

  order.orderStatus = req.body.orderStatus;

  if (req.body.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
  });
});

async function updateStock(productId, quantity) {
    const product = await Productmodel.findById(productId);
    if (product) {
        product.stock -= quantity;
        await product.save({ validateBeforeSave: false });
    }
}

exports.deleteOrder = catchasyncerror(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new ErrorHandler('Invalid order ID', 400));
    }

    const order = await orderModel.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
    });
});
