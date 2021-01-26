
const express = require('express');
const app = express();
const morgan = require('morgan');

// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

// middlewares 
app.use(morgan('dev'));
app.use(express({extended: false}));
app.use(express.json())

//router
app.use('/api',require('./module/r_client'));

// iniciamos the server
app.listen(app.get('port'), () => {
    console.log('SERVER ON PORT ',app.get('port'))
})