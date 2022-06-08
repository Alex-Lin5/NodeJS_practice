var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('root');
});
app.get('/:num', (req, res) => {
    res.send(`level ${req.params.num}`);
});

// console.log('hello');
var port = process.env.PORT || 3000;
app.listen(port);