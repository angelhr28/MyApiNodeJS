const MClient = require('./m_client');

/**
 * Lista a todos los clientes registrados dentro de la empresa, ademas de una fecha estimadad de su muerte respectiva
 *
 * returns List
 **/
async function getListClient(req, res){
    try {
        let result = await MClient.getListClient();
        res.status(200).send(result);
    } catch(err){
        console.log('ERROR: ', err)
        res.status(err.status).send(err);
    }
} 

/**
 * Obtendremos el promedio de edades de los clientes registrados y su respectiva desviacion standart para su evaluacion
 *
 * returns Object
 **/
async function getKpideClient(req, res){
    try {
        let result = await MClient.getKpideClient();
        res.status(200).send(result);
    } catch(err){
        console.log('ERROR: ', err)
        res.status(err.status).send(err);
    }
} 

/**
 * Permite registrar los datos de un nuevo cliente interesado en la empresa.
 *
 * createClient Registrar los datos de un nuevo cliente interesado en la empresa.
 * returns Object
 **/
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
        console.log('ERROR: ', err)
        res.status(err.status).send(err);
    }
} 


/**
 * Validacion de elementos enviados por el request, en caso sea vacio, null, o undefine retornara una reject al front
 *
 * returns Object
 **/
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