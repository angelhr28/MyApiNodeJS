const client = require('./database');

async function query ( sql, values = null) {
    return new Promise((resolve, reject) => {
        try {
            client.connect();
            client.query( sql, values, ( err, result) => {        
                if (err) throw err
                resolve (result.length > 1 ? result.rows : result.rows[0]); 
                client.end();
            })
        } catch(err) {
           reject(err);     
        }      
    })
};

async function asd () {
    let a = await query('select * from persona where nid_persona = $1', [2]);
    console.log('retorno estooooo ', a)
    return a ;
}

module.exports = query;
