const { Router } = require('express');
const router = Router();
const controller = require('./c_client')

    router
    .get('/getListClient', controller.getListClient)
    .get('/getKpideClient', controller.getKpideClient)
    .get('/createClient', controller.createClient)

module.exports = router;