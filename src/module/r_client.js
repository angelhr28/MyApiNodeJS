const { Router } = require('express');
const router = Router();
const controller = require('./c_client')
const bodyParser = require('body-parser')
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
/**
 * Enrrutamiento de microservicios 
 **/
    router
    .get('/getListClient' , controller.getListClient)
    .get('/getKpideClient', controller.getKpideClient)
    .post('/createClient' , urlencodedParser, controller.createClient)

module.exports = router;