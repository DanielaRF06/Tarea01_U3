const http = require('http');
const path = require('path');
const status = require('http-status');

//var brandController = require('./brand.controller');
let _product;

const createProduct = (req,res)=>{
    const product = req.body;

    _product.create(product)
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Producto creada exitosamente",data:data});
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error!",data:err});
        })
}

const findAll = (req,res)=>{
    _product.find()
        .then((data)=>{
            if(data.length == 0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No existen registro de producto"});
            }else{
                res.status(status.OK);
                res.json({msg:"Exito",data:data});
            }
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error"});
        })
}

const findId = (req,res) =>{
    const {id} = req.params;
    _product.findOne({_id:id})
        .then((data)=>{
                res.status(status.OK);
                res.json({msg:"ÉXITO!",data:data});
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
                res.json({msg:"Error!",data:err});
        });
}

const deleteById = (req,res) =>{
    const {id} = req.params;
    const params = {
        _id:id
    }

    _product.findByIdAndRemove(params)
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Exitoso",data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error no se encontro",err:err});
        });
}

const updateProduct = (req,res) =>{
    const{id} = req.params;
    
    _brand.update({_id:id},{$set:req.body})
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Datos actualizados",data:data});
        })
        .catch((err)=>{
            res.status({msg:"Error",data:err});
        });
}
module.exports = (Product) =>{
    _product = Product;
    return ({
        createProduct,
        findAll,
        deleteById,
        updateProduct,
        findId
    })
}

