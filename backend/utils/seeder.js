const Products=require('../data/Data.json');
const product=require('../models/productModel');
const dotenv=require('dotenv');
dotenv.config({path:'backend/config/config.env'});
const connectDatabase=require('../config/dataBase');
connectDatabase();
 const seedProducts=async()=>{
    try{
    product.deleteMany();
    console.log("Deleted Successfully");
    await product.insertMany(Products);
    console.log("Inserted successfully");
}
catch(error){
    console.log(error.message);
}
process.exit();
 }
 seedProducts();