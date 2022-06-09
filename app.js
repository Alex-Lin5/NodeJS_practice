var express = require('express');
var app = express();
const config = require('config');
const debug = require('debug')('app:startup');
const root = require('./routes/root');

// configuration
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);
debug(`Application Name: ${config.get('name')}`);
debug(`Mail Server: ${config.get('mail.host')}`);
if (app.get('env') === 'production'){
    console.log('In production mode.');
}
else if (app.get('env') === 'development'){
    console.log('In development mode.');
}

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // req stage
app.use(express.static('public'));
// middleware
app.use(function(req, res, next){
    console.log('Logging..');
    next();
});
app.use(function(req, res, next){
    console.log('Authenticating..');
    next();
})
app.use('/', root);

// console.log('hello');
var port = process.env.PORT || 3000;
app.listen(port);
