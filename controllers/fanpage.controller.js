const http = require('http');
const path = require('path');
const status = require('http-status');

let _fanpage;

const createFanpage = (req,res) =>{
    const fanpage = req.body;
    _fanpage.create(fanpage)
        .then((data) => {
            res.status(200);
            res.json({ msg: "FanPage hecho con exito!", data: data});
        })
        .catch((err) => {
            res.status(400);
            res.json({ msg: "Error", data: err });
        })

    }
    const findAllComents = (req, res) => {
        var arregldecoments=[];
        _fanpage.find()
            .then((data) => {
                data.forEach(fpage => {
                    arregldecoments.push(fpage['coments'])
                });
                if (data.length == 0) {
                    res.status(status.NO_CONTENT);
                    res.json({ msg: "No hay fanpages registradas" });
                }
                else {
                    res.status(status.OK);
                    res.json({ 
                        msg: "Fanpages consultados con éxito", 
                        data: arregldecoments 
                    });
                }
            })
            .catch((error) => {
                res.status(status.BAD_REQUEST);
                res.json({ 
                    msg: "Error al realizar la busqueda", 
                    err: error 
                });
            });
    }
    const findAllFanpage = (req, res) => {
        _fanpage.find()
            .then((data) => {
                if (data.length == 0) {
                    res.status(status.NO_CONTENT);
                    res.json({ msg: "Sin fanpages registrados" });
                }
                else {
                    res.status(status.OK);
                    res.json({ 
                        msg: "Fanpages consultados con éxito", 
                        data: data 
                    });
                }
            })
            .catch((error) => {
                res.status(status.BAD_REQUEST);
                res.json({ 
                    msg: "Error al realizar la busqueda", 
                    err: error 
                });
            });
    }
    
const findByIdFanpage = (req, res) => {
    const { id } = req.params;
    const params = {
        _id: id
    }
    _fanpage.findById(params)
        .then((data) => {
            res.status(status.OK);
            res.json({ 
                msg: "Este es el fanpage que buscas", 
                data: data 
            });
        })
        .catch((error) => {
            res.status(status.BAD_REQUEST);
            res.json({ 
                msg: "Error al realizar la busqueda", 
                err: error 
            });
        })
}

const updateComents = (req, res) => {
    const { id } = req.params;
    const params = {
        _id: id
    }
    _fanpage.findByIdAndUpdate(params, req.body)
        .then((data) => {
            res.status(status.OK);
            res.json({ 
                msg: "comentario agregado",
                data: data 
            });

        }).catch((error) => {
            res.status(status.NOT_FOUND);
            res.json({ 
                msg: "Error al realizar la modificación", 
                err: error 
            });
        });
}

const califglobal = (req, res) => {
    var global = 0;
    const { id } = req.params;
    _fanpage.find({"_id":id})
    .then((data)=>{
        var calif2= data[0]["calif"].length;
        data[0]["calif"].forEach(cali =>{
            global += cali;
        });
        res.status(status.OK);
            res.json({ 
                calfglobalfinal:global/calif2
            });
    }).catch((error) => {
        res.status(status.NOT_FOUND);
        res.json({ 
            msg: "Error al realizar la calificaion", 
            err: error 
        });
    });
}

module.exports = (fanpage)=>{
    _fanpage= fanpage;
    return({
        createFanpage,
        findAllFanpage,
        findByIdFanpage,
        updateComents,
        findAllComents,
        califglobal
    });
}