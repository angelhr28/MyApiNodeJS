const { Router } = require('express');
const router = Router();
const controller = require('./c_client')

var bodyParser = require('body-parser')
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

    router
    .get('/getListClient' , controller.getListClient)
    .get('/getKpideClient', controller.getKpideClient)
    .post('/createClient' , urlencodedParser, controller.createClient)
    // .post('/createClient' , jsonParser, controller.createClient)

module.exports = router;