const express = require('express');
const router = express.Router();    
const { isauthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const newOrder = require('../controllers/orderController').newOrder;
const getSingleOrder = require('../controllers/orderController').getSingleOrder;
const getMyOrders = require('../controllers/orderController').getMyOrders;
const getAllOrders = require('../controllers/orderController').getAllOrders;
const updateOrder = require('../controllers/orderController').updateOrder;
const deleteOrder = require('../controllers/orderController').deleteOrder;
router.route('/order/new').post(isauthenticatedUser,newOrder);
router.route('/order/:id').get(isauthenticatedUser,getSingleOrder);
router.route('/myorders').get(isauthenticatedUser,getMyOrders);
router.route('/admin/orders').get(isauthenticatedUser, authorizeRoles('admin'), getAllOrders);
router.route('/admin/order/:id')
    .put(isauthenticatedUser, authorizeRoles('admin'), updateOrder)
    .get(isauthenticatedUser, authorizeRoles('admin'), getSingleOrder)
    .delete(isauthenticatedUser, authorizeRoles('admin'), deleteOrder);
module.exports = router;