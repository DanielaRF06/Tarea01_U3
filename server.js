// Modulos
const bodyParser = require('body-parser'); // recupera lo que venga de bodyparams
const express = require('express');  
const morgan = require('morgan'); // Sirve para visualizar las peticiones que hace el cliente al servidor  y el resultado.
                               // Dependencia de desarrollo no va dentro de dependencias donde estas las otras devDependecies
                               //npm i morgan --save-dev
const wagner = require('wagner-core'); //inyector de dependencias
const path = require('path'); // Recupera los queryParams

//Configuracion del servirdor
let app = express();  //instanciar de express

require('./models/models')(wagner); //pone disponible todo lo de models



app.use(morgan('dev'));
app.use(bodyParser.json()); // recupere en json
app.use(bodyParser.urlencoded({extended:false}));

//'Permisos' y restrincciones
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');//desde donde se puede consultar la api
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');//Metodos que puede utilizar
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization'); // encabezados
    next();//termina
});
//urlBase ip o nom dominio:puerto/directorio
const urlBase = "/api/v1/";

const user = require('./routers/user.routes')(wagner); //recibe el wagner para invocar
const brand = require('./routers/brand.routes')(wagner);



app.use(urlBase+'usuarios',user);
app.use(urlBase+'brands',brand);
module.exports = app;
