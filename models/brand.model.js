const mongoose = require('mongoose');

let brandSchema = new mongoose.Schema({
    brand: {
      required: true,
      type: String
    }
});
  
  const brandModel = mongoose.model('Brand', brandSchema, 'brands'); // crea el modelo en el esquema.
  
  module.exports = brandModel; //exporta el modelos