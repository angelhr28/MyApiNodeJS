// const { Client } = require('pg');

var bluebird = require('bluebird');
const pgp = require('pg-promise')({
    promiseLib: bluebird
});


const client = pgp({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "nino3667193",
    database: "tech"
})



module.exports = client;