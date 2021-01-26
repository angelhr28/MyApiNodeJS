const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "nino3667193",
    database: "tech"
})

client.on("connect", ()=> {
    console.log("DataBase Connection");
})

client.on("end", ()=> {
    console.log("Connection end");
})

module.exports = client;