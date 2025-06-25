const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalcode: {
            type: Number,
            required: true
        },
        phoneno: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required:true
            }
        }
    ],
    itemsprice:{
        type: Number,
        default: 0.0
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    taxPrice: {
        type: Number,
        default: 0.0,
        required: true
    },
    shippingPrice: {
        type: Number,
        default: 0.0,
        required: true
    },
    totalPrice:{
        type:Number,
        default : 0.0,
        required: true
    },
    orderStatus:{
        type:String,
        default:'Processing',
        required: true
    },
    paidAt:{
        type: Date,
        default: Date.now,
        required: true
    },
    deliveredAt:{
        type : Date,
        required: false
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});
orderSchema.pre('save', function(next) {
    if (this.isNew) {
        this.createdAt = Date.now();
    }
    next();
});
module.exports = mongoose.model('Order', orderSchema);