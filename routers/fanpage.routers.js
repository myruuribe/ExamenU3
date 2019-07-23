const router = require('express').Router();

module.exports = (wagner) =>{
    const fanpageCtrl = wagner.invoke((Fanpage)=>
    require('../controllers/fanpage.controller')(Fanpage));

    router.post('/', (req,res)=>
    fanpageCtrl.createFanpage(req,res));

    router.get('/', (req,res)=>
        fanpageCtrl.findAllFanpage(req,res));

    router.get('/coments/all', (req,res)=>
        fanpageCtrl.findAllComents(req,res));

    router.get('/:id', (req,res)=>
        fanpageCtrl.findByIdFanpage(req,res));

    router.get('/calificacion/global/:id', (req,res)=>
        fanpageCtrl.califglobal(req,res));

    router.put('/:id', (req,res)=>
        fanpageCtrl.updateComents(req,res));

    return router;
}