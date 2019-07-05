const router = require('express').Router();

module.exports = (wagner) => {
    const productCtrl = wagner.invoke((Product) =>
                            require('../controllers/product.controller')(Product));
    
     router.post('/',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
             productCtrl.createProduct(req,res);
    });
    return router;
}