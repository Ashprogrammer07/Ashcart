const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Name cannot exceed 30 characters'],
        minlength: [4, 'Name should have more than 4 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate:[validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password should be longer than 6 characters'],
        maxlength: [20, 'Password cannot exceed 20 characters'],
        select: false // Do not return password in queries
    },
    avatar: {
        type: String,
        
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    user:{
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    // Hash the password before saving
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.getJwtToken = function() {
    
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME || '30d'
    });
};
userSchema.methods.isvalidpassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function() {
    const token=crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex');
    this.resetPasswordExpire=Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes
    return token;
}
let model=mongoose.model('User', userSchema);
module.exports = model;