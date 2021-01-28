const MClient = require('./m_client');

async function getListClient(req, res){
    try {
        let result = await MClient.getListClient();
        res.status(200).send(result);
    } catch(err){
        console.log(err)
        res.status(500).send(err);
    }
} 

async function getKpideClient(req, res){
    try {
        let result = await MClient.getKpideClient();
        res.status(200).send(result);
    } catch(err){
        res.status(err.status).send(err);
    }
} 

async function createClient(req, res){
    try {
        let name     = req.body.name_pers;
        let ape      = req.body.ape_pers;
        let edad     = req.body.edad_pers;
        let fechaNac = req.body.fech_nac;

        global.__isNull([name, ape, edad, fechaNac]);

        let result = await MClient.createClient(name, ape, edad, fechaNac);
        console.log(result)
        res.status(200).send(result);
    } catch(err){
        console.log("ERROR ::: ", err)
        res.status(err.status).send(err);
    }
} 

global.__isNull = function (value, msj = {status: 400 , msj:'Accion no permitida'}) {
    if (typeof value == 'object' && value != null) {
        for (var elm of value) {
            if (String(elm).trim() == null || String(elm).trim() == '' || String(elm).trim() == 'null' || elm == undefined) {
                throw msj;
            }
        }
    } else {
        if (String(value).trim() == null || String(value).trim() == '' || String(value).trim() == 'null' || value == undefined) {
            throw msj;
        }
    }
}

module.exports = {
    getListClient,
    getKpideClient,
    createClient
};