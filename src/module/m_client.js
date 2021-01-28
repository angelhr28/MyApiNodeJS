'use strict'

const dbp = require('../helper/database');

/**
 * Consulta a la tabla cliente que retornara la lista de clientes registrados 
 * obteniedo los datos del cliente y su fecha de defuncion aproximada.
 *
 * returns List
 **/
function getListClient(){
    return new Promise((resolve, reject) => {
        let sql = `SELECT id_client,
                          name_client,
                          ape_client, 
                          edad_client, 
                          to_char(fec_naci, 'MON DD YYYY' ) AS fecha_naci, 
                          to_char(fec_naci + CAST(CONCAT((80 - edad_client)::TEXT, ' year') AS INTERVAL), 'MON DD YYYY') AS fecha_mortalidad 
                     FROM cliente;`
        dbp.any(sql).then( result => {
            if (result.length == 0 ) return reject({ msj: 'Sin clientes registrados.', status : 400 }); // Controlado
            return resolve(result)
        }).catch( err => {
            return reject({ msj: err,  status: 500 });  // Desconocido
        }).finally(dbp.end);
    })
} 

/**
 * Consulta a la tabla cliente que retornara el promedio y la desviacion standart general
 *
 * returns Object
 **/
function getKpideClient(){
    return new Promise((resolve, reject) => {
        let sql = `SELECT ROUND(AVG(edad_client), 2) AS prom_edad,
                          STDDEV(edad_client) AS desv_stand
                     FROM cliente;`
        dbp.one(sql).then( result => {
            return resolve(result)
        }).catch( err => {
            return reject(err);
        }).finally(dbp.end);
    })
} 

/**
 * Ingreso de un nuevo cliente a la tabla cliente de los datos respectivos.
 *
 * returns Object
 **/
function createClient(name, ape, edad, fechaNac){
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM __create_client_01($1, $2, $3, $4) AS res;`
        
        dbp.one(sql, [name, ape, fechaNac, edad]).then( result => {
            console.log("retorno estoooo ", result.res)
            result = result.res;
            if (result.status == 2) return reject({ msj: result.msj, stack_error : result.stack_error }); // Desconocido
            if (result.status == 1) return reject({ msj: result.msj,  status     : 400 });  // Controlado
            return resolve(result)
        }).catch( err => {
            return reject(err);
        }).finally(dbp.end);
    })
} 

module.exports = {
    getListClient,
    getKpideClient,
    createClient
};
