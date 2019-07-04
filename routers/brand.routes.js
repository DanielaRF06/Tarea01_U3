const  router = require('express').Router(); 

module.exports = (wagner) => {

        const brandCtrl = wagner.invoke((Brand) => //invoca parametro 
                                require('../controllers/brand.controller')(Brand));

        router.post('/',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
                brandCtrl.createBrand(req,res);
        });

        router.get('/',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
                brandCtrl.findAll(req,res);
        });

        router.delete('/:id',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
                brandCtrl.deleteById(req,res);
        });
        router.put('/:id',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
                brandCtrl.updateBrand(req,res);
        });
        return router;
}
