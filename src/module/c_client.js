

async function getListClient(req, res){
    try {
        res.status(200).send({"title": "Hello getListClient"});
    } catch(err){
        res.status(500).send(err);
    }
} 

async function getKpideClient(req, res){
    try {
        res.status(200).send({"title": "Hello getKpideClient"});
    } catch(err){
        res.status(500).send(err);
    }
} 

async function createClient(req, res){
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