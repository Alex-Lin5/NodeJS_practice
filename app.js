var express = require('express');
var app = express();
const config = require('config');
const debug = require('debug')('app:startup');

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
app.use(function(req, res, next){
    console.log('Logging..');
    next();
});
app.use(function(req, res, next){
    console.log('Authenticating..');
    next();
})

app.get('/', (req, res) => {
    res.render('index', {title: 'Root', message: 'header'});
});
app.get('/:num', (req, res) => {
    res.send(`level ${req.params.num}`);
});

// console.log('hello');
var port = process.env.PORT || 3000;
app.listen(port);
