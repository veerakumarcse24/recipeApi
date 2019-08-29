var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var auth_router = require('./routes/auth_router');

app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use('/api', auth_router);
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})