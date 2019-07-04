            //Poner disponible a traver de wagner todos los modelos
const mongoose = require('mongoose');
const _ = require('underscore');
const config = require('../_config')            

module.exports = (wagner) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://localhost:27017/${config.DB}`,{ useNewUrlParser: true });

    wagner.factory('db',()=>mongoose);//metodo factory:pone disponible una variable para que todos la puedan usar a traver de la variable db

    const User= require ('./user.model'); // devuelve el modelo , contendra todos los objetos que se necesiten
    const Brand= require ('./brand.model');
    
    const models ={
        User,
        Brand
    }
    //underscore sirve para recorrer el objeto models que recibe los modelos de User
    //v = es el contenido de la variable
    //k = el nombre de la variable
    _.each(models,(v,k)=>{
        wagner.factory(k, ()=>v);
        /** Es igual a esto 
         * const User= require ('./user.model');
         * wagner.factory('User',()=>User);
         */
    });

}