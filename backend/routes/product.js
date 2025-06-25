const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads/products'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

// Controllers
const {
  getProducts,
  createProduct,
  getsingleProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
  createProductReview,
  getAdminProducts,
  deleteReviews,
} = require('../controllers/productController');

// Middleware
const { isauthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');


// ====================
// ✅ PUBLIC ROUTES
// ====================

// Get all products
router.route('/products').get(getProducts);

// Get a single product
router.route('/products/:id').get(getsingleProduct);

// Product reviews (by user)
router.route('/products/reviews')
  .get(isauthenticatedUser, getProductReviews)
  .post(isauthenticatedUser, createProductReview);


// ====================
// ✅ ADMIN ROUTES
// ====================

// Delete a product review (must be BEFORE /admin/products/:id)
router.route('/admin/products/reviews')
  .get(isauthenticatedUser, authorizeRoles('admin'), getProductReviews)
  .delete(isauthenticatedUser, authorizeRoles('admin'), deleteReviews);

// Get all products (admin only)
router.route('/admin/products').get(isauthenticatedUser, authorizeRoles('admin'), getAdminProducts);

// Create a new product
router.route('/admin/products/new')
  .post(isauthenticatedUser, authorizeRoles('admin'), upload.array('images'), createProduct);

// Update or delete a product by ID
router.route('/admin/products/:id')
  .put(isauthenticatedUser, authorizeRoles('admin'), upload.array('images'), updateProduct)
  .delete(isauthenticatedUser, authorizeRoles('admin'), deleteProduct);


module.exports = router;
