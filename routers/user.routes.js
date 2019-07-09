                                //metodo Router sirve para
const  router = require('express').Router(); 

module.exports = (wagner) => {

        const userCtrl = wagner.invoke((User) => //invoca parametro 
                                require('../controllers/user.controller')(User));

        router.post('/',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
                userCtrl.createUser(req,res);
        });
        
        router.get('/',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
                userCtrl.findAll(req,res);
        });
        router.get('/csvfile',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
                userCtrl.insertarDatos(req,res);
        });
        router.get('/usr/:id',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
                userCtrl.findId(req,res);
        });
        router.get('/login/:email/:password',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
                userCtrl.login(req,res);
        });
                // recibe un path params
        router.delete('/:id',(req,res)=>{ // tiene acceso a req y res, y enviar al controller de user
                userCtrl.deleteById(req,res);
        });
        router.put('/:id',(req,res)=>{ // tiene acceso a req y res,99 y enviar al controller de user
                userCtrl.updateUser(req,res);
        });
        

        return router;
}