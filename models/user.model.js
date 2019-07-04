const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
      required: true,
      type: String
    },
    email: {
      type: String,
      lowercase: true,
      match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 'Please fill a valid email address'] //despues de la coma envia msj del error
    },
    password: {
      type: String,
      //required: true
    }
  });
  
  const userModel = mongoose.model('Usuario', userSchema, 'usuarios'); // crea el modelo en el esquema.
  
  module.exports = userModel; //exporta el modelos