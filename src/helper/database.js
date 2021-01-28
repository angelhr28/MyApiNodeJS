var bluebird = require('bluebird');
const pgp = require('pg-promise')({
    promiseLib: bluebird
});

const client = pgp({
    host: "/cloudsql/myapinodejs:us-central1:prueba", //"localhost"
    port: 5432,
    user: "postgres",
    password: "nino3667193",
    database: "prueba"
})

module.exports = client;