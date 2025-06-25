const express = require('express');
const app = express();
const dotenv = require('dotenv');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const errmiddleware=require('./middlewares/error');
const cookieParser = require('cookie-parser');
const payment=require('./routes/payment');
const path=require('path');
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

app.use(express.json()); // ✅ parses JSON bodies
app.use(express.urlencoded({ extended: true })); // optional, for form data

app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )
app.use('/api/v1', productRoutes);
app.use('/api/v1', require('./routes/auth'));
app.use('/api/v1', orderRoutes);
app.use('/api/v1',payment);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    })
}
app.use(errmiddleware);
module.exports = app;