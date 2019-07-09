const http = require('http');
const path = require('path');
const status = require('http-status');
const _config = require('../_config');
const jwt = require('jsonwebtoken');

const csvFilePath='./users.csv';
const csv =require('csvtojson').Converter;
const fs = require('fs');

let _user;
/**  POST */
const createUser = (req,res)=>{//req = request , res= response
    const user = req.body; //Recibe el request alguien lo envia

    _user.create(user)
        .then((data)=>{
            //Atraves del res, enviar mensaje al cliente con lo que se creo
                res.status(200);
                res.json({msg:"Usuario creado exitosamente", data:data});
        })
        .catch((err) =>{
                res.status(400);
                res.json({msg:"Error!",data:err});
        });
}
/**  GET*/
const findAll = (req,res) =>{
    //_user
    _user.find()
        .then((data)=>{
            if(data.length == 0){
                res.status(status.NO_CONTENT);
                re.json({msg:"No se encontraron usuarios"});
            }else{
                res.status(status.OK);
                res.json({msg:"ÉXITO!",data:data});
            }
        })
        .catch((err)=>{
                res.status(status.BAD_REQUEST);
                res.json({msg:"Error!"});
        });
}
const findId = (req,res) =>{
    const {id} = req.params;
    _user.findOne({_id:id})
        .then((data)=>{
                res.status(status.OK);
                res.json({msg:"ÉXITO!",data:data});
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
                res.json({msg:"Error!",data:err});
        });
}
/** DELETE */
const deleteById = (req,res) =>{
    //Destructor
    const {id}  = req.params;  /// es igual a const id  = req.params.id; 
    const params = {
        _id:id
    }
    _user.findByIdAndRemove(params)
        .then((data)=>{
             res.status(status.OK);
             res.json({msg:"Exito",data:data});
        })
        .catch((err)=>{ 
             res.status(status.NOT_FOUND);
             res.json({msg:"Error! No se encontro",err: err});
        });

}
const updateUser = (req,res) =>{
    const {id} = req.params;

    _user.update({_id:id},{$set:req.body})
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Datos actualizados", data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error",data:err});
        });        
}
/**LOGIN */
const login = (req,res) =>{
    const { email,password} = req.params;
    let query = { email:email,password:password};

    _user.findOne(query,"-password")
        .then((user)=>{
            if(user){
                const token = jwt.sign({email:email},_config.SECRETJWT);
                res.status(status.OK);
                res.json({msg:"Acceso exitoso",data:{user:token,token:token}});
            }else{
                res.status(status.NOT_FOUND);
                res.json({msg:"Error!! No se encontró",});
            }
        })
        .catch((err)=>{
                res.status(status.NOT_FOUND);
                res.json({msg:"Error !! No se encontró",err:err});
        });
}
/** Insertar csv */
var csvConv = new csv({})
async function csv2 (req,res){
    csvConv.on("end_parsed",function(jsonObj){
        console.log(jsonObj); //here is your result json object
    });
}
/** Exporta una funcion que recibe el modelo */
module.exports = (User) =>{ 
    _user = User; //Asigna el modelo a _user
    return ({//retorna metodos
        createUser,
        findAll,
        deleteById,
        updateUser,
        findId,
        login,
        csv2
    }); 
}