const Productmodel = require("../models/productModel"); 
const ErrorHandler=require('../utils/errorHandler.js');
const catcherrmiddleware=require('../middlewares/catchasyncerror.js');
const catchasyncerror = require('../middlewares/catchasyncerror.js');
const APIfeatures = require('../utils/apiFeatures.js');
const mongoose=require('mongoose')
exports.getProducts = catchasyncerror(async (req, res, next)=>{
    const resPerPage = 3;
    
    let buildQuery = () => {
        return new APIfeatures(Productmodel.find(), req.query).search().filter()
    }
    
    const filteredProductsCount = await buildQuery().query.countDocuments({})
    const totalProductsCount = await Productmodel.countDocuments({});
    let productsCount = totalProductsCount;

    if(filteredProductsCount !== totalProductsCount) {
        productsCount = filteredProductsCount;
    }
    
    const products = await buildQuery().paginate(resPerPage).query;

    res.status(200).json({
        success : true,
        count: productsCount,
        resPerPage,
        products
    })
})
exports.createProduct = catcherrmiddleware(async (req, res) => {
    let images=[]
    let BASE_URL=process.env.BACKEND_URL
if(process.env.NODE_ENV==='production'){
    BASE_URL=`${req.protocol}://${req.get('host')}`
}
    if(req.files.length>0){
        req.files.forEach(file=>{
            let url=`${BASE_URL}/uploads/products/${file.originalname}`
            images.push({image: url})
        })
       
    }
    req.body.images=images
    req.body.user = req.user.id; // Assuming you have user authentication and req.user is set
    const product=await Productmodel.create(req.body);
    res.status(201).json({
        success:true,
        product
    });
});
exports.getsingleProduct = async (req, res, next) => {
    const mongoose = require('mongoose');
    // Check for valid ObjectId and return 404 if invalid
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    const product = await Productmodel.findById(req.params.id).populate('reviews.user','name email');
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    res.status(200).json({
        success: true,
        product
    });
}

exports.updateProduct = async (req, res,next) => {
     let images=[]
     if(req.body.imagescleared==='false'){
        images=product.images;
     }
     let BASE_URL=process.env.BACKEND_URL
if(process.env.NODE_ENV==='production'){
    BASE_URL=`${req.protocol}://${req.get('host')}`
}
    if(req.files.length>0){
        req.files.forEach(file=>{
            let url=`${BASE_URL}/uploads/products/${file.originalname}`
            images.push({image: url})
        })
       
    }
    req.body.images=images
    const product= await Productmodel.findById(req.params.id);
    if(!product){
      res.status(404).json({
        success:false,
        message:"Product not found"
      });
    }
    Productmodel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }).then((product) => {
        res.status(200).json({
            success: true,
            product
        });
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message
        });
    });
}
exports.deleteProduct = async (req, res,next) => {
    const product= await Productmodel.findById(req.params.id);
    if(!product){
      res.status(404).json({
        success:false,
        message:"Product not found"
      });
    }
    Productmodel.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message
        });
    });
}

exports.createProductReview = catcherrmiddleware(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        rating: Number(rating),
        comment
    };

    const product = await Productmodel.findById(productId);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    product.ratings =   isNaN(avg) ? 0 : avg/ product.reviews.length;
    
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: 'Review added successfully'
    });
}
);

exports.getProductReviews = catcherrmiddleware(async (req, res, next) => {
    const product = await Productmodel.findById(req.query.id).populate('reviews.user','name email');;

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
}
);




exports.deleteReviews = catchasyncerror(async (req, res, next) => {
    const { productId, id: reviewId } = req.query;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler("Invalid productId", 400));
    }
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return next(new ErrorHandler("Invalid reviewId", 400));
    }

    // Fetch product
    const product = await Productmodel.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // Check if the review exists
    const reviewExists = product.reviews.some(
        review => review._id.toString() === reviewId
    );
    if (!reviewExists) {
        return next(new ErrorHandler("Review not found", 404));
    }

    // Filter out the review
    const updatedReviews = product.reviews.filter(
        review => review._id.toString() !== reviewId
    );

    // Calculate new rating
    const numOfReviews = updatedReviews.length;
    let ratings = updatedReviews.reduce((acc, review) => acc + Number(review.rating), 0);
    ratings = numOfReviews > 0 ? ratings / numOfReviews : 0;

    // Update product
    product.reviews = updatedReviews;
    product.numOfReviews = numOfReviews;
    product.ratings = ratings;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
    });
});



exports.getAdminProducts= catchasyncerror(async(req,res,next)=>{
    const products= await Productmodel.find();
    res.status(200).send({
        success:true,products
    })
})