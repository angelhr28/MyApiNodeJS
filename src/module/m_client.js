'use strict'

const dbp = require('../helper/database');

function getListClient(){
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM persona WHERE nid_persona = 1'
        dbp.any(sql).then( result => {
            return resolve(result)
        }).catch( err => {
            return reject(err);
        }).finally(dbp.end);
    })
} 

async function getKpideClient(){
    try {
        res.status(200).send({"title": "Hello getKpideClient"});
    } catch(err){
        res.status(500).send(err);
    }
} 

async function createClient(){
    try {
        res.status(200).send({"title": "Hello createClient"});
    } catch(err){
        res.status(500).send(err);
    }
} 

module.exports = {
    getListClient,
    getKpideClient,
    createClient
};