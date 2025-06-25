const catchasyncerror = require('../middlewares/catchasyncerror');
const jwt = require('jsonwebtoken');
const Usermodel = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');

exports.isauthenticatedUser = catchasyncerror(async(req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Please login to access this resource'
        });
    }

   
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Usermodel.findById(decodedData.id);
        next();
   
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    };
}