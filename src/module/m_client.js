'use strict'

const dbp = require('../helper/database');

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

// Promedio edad entre todos los clientes​
// Desviación estándar entre las edades de todos los clientes​


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




// CREATE SEQUENCE cliente_id_client_seq;


// CREATE TABLE cliente
// (
//     id_client integer NOT NULL DEFAULT nextval('cliente_id_client_seq'),
//     name_client character varying(300) NOT NULL DEFAULT '',
//     ape_client character varying(300) NOT NULL  DEFAULT '',
//     fec_naci date DEFAULT now(),
//     edad_client integer NOT NULL  DEFAULT 0,
//     CONSTRAINT id_client PRIMARY KEY (id_client)
// )

// select * from cliente;