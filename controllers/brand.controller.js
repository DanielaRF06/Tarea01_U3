const http = require('http');
const path = require('path');
const status = require('http-status');

let _brand;
/**  POST */
const createBrand = (req,res) =>{
    const brand =req.body;

    _brand.create(brand)
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Marca creada exitosamente",data:data});
        })
        .catch((err)=>{ 
            res.status(status.BAD_REQUEST);
                res.json({msg:"Error!",data:err});
        });      
}

/** GET */
const findAll = (req,res)=>{
    _brand.find()
        .then((data)=>{
            if(data.length == 0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No existen registro de marcas"});
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

/** DELETE */
const deleteById = (req,res) =>{
    const {id} = req.params;
    const params = {
        _id:id
    }

    _brand.findByIdAndRemove(params)
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Exitoso",data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error no se encontro",err:err});
        });
}

const updateBrand = (req,res) =>{
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

/** Exporta una funcion que recibe el modelo */
module.exports = (Brand) =>{ 
    _brand = Brand; //Asigna el modelo a _user
    return ({//retorna metodos
        createBrand,
        findAll,
        deleteById,
        updateBrand
    }); 
}
