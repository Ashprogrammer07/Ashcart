const ErrorHandler = require('../utils/errorHandler');
const catchasyncerror = require('../middlewares/catchasyncerror');
const Usermodel = require('../models/userModel');
const sendToken = require('../utils/jwt');
const sendEmail = require('../utils/email');
const crypto = require('crypto');

exports.registerUser = catchasyncerror(async (req, res, next) => {
    const { name, email, password } = req.body;
let avatar;
let BASE_URL=process.env.BACKEND_URL
if(process.env.NODE_ENV==='production'){
    BASE_URL=`${req.protocol}://${req.get('host')}`
}
if(req.file){
    avatar=`${BASE_URL}/uploads/user/${req.file.originalname}`
}
    // Remove manual duplicate check to let MongoDB handle it
    const user = await Usermodel.create({
        name,
        email,
        password,
        avatar
    });
    
   sendToken(user, 201, res);
});

exports.loginUser = catchasyncerror(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    // Find user by email
    const user = await Usermodel.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    // Check if password matches
    const isMatch = await user.isvalidpassword(password);
    if (!isMatch) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

   
    sendToken(user, 200, res);
});

exports.logoutUser = catchasyncerror(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});
exports.forgotPassword = catchasyncerror( async (req, res, next)=>{
    const user =  await Usermodel.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false})
    
    let BASE_URL = process.env.FRONTEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }


    //Create reset url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try{
        sendEmail({
            email: user.email,
            subject: "ASHCART Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`,
            user
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message), 500)
    }

})  

exports.resetPassword = catchasyncerror(async (req, res, next) => {
    const { token } = req.params;
   
    // Hash the token to compare with the stored token
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user by reset password token and check if it is still valid
    const user = await Usermodel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler('Reset password token is invalid or has expired', 400));
    }
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Passwords do not match', 400));
    }
    const password=req.body.password;
    // Update user's password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save(validateBeforeSave = false);

    sendToken(user, 200, res);
}
);


exports.getUserProfile = catchasyncerror(async (req, res, next) => {
    const user = await Usermodel.findById(req.user.id);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    res.status(200).json({
        success: true,
        user
    });
});

exports.changePassword = catchasyncerror(async (req, res, next) => {
   
    const user = await Usermodel.findById(req.user.id).select('+password');
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Check if old password matches
    const isMatch = await user.isvalidpassword(req.body.oldPassword);
    if (!isMatch) {
        return next(new ErrorHandler('Old password is incorrect', 401));
    }

    // Update password
    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);
});

exports.updateProfile = catchasyncerror(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };
    let BASE_URL=process.env.BACKEND_URL
if(process.env.NODE_ENV==='production'){
    BASE_URL=`${req.protocol}://${req.get('host')}`
}

    if (req.file) {
        const avatarUrl = `${BASE_URL}/uploads/user/${req.file.originalname}`;
        newUserData.avatar = avatarUrl;
    }

    const user = await Usermodel.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        user
    });
});


exports.getAllUsers = catchasyncerror(async (req, res, next) => {
    const users = await Usermodel.find();
    if (!users) {
        return next(new ErrorHandler('No users found', 404));
    }
    res.status(200).json({
        success: true,
        users
    });
}
);

exports.getSingleUser = catchasyncerror(async (req, res, next) => {
    const user = await Usermodel.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    res.status(200).json({
        success: true,
        user
    });
}
);

exports.updateUserRole= catchasyncerror(async (req, res, next) => {
  const newuserdata={
    role:req.body.role

  }
  const user=await Usermodel.findByIdAndUpdate(req.params.id, newuserdata, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  if (!user) {
      return next(new ErrorHandler('User not found', 404));
  }
  res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user
  });
  
});
exports.deleteUser = catchasyncerror(async (req, res, next) => {
    const user = await Usermodel.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    // Delete user
    await user.deleteOne();
    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
}
);