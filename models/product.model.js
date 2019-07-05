var mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    codigo:{
        type:String,
        required:true
    },
    p_compra:{
        type:Number,
        required:true
    },
    p_venta:{
        type:Number,
        required:true
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Brand' 
    },
    cantidad:{
        type:Number,
        required:true
    },
    minimo:{
        type:Number,
        required:true
    },
    maximo:{
        type:Number,
        required:true
    }
});

const productModel = mongoose.model('Product',productSchema,'products');
module.exports = productModel;