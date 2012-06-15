var express = require('express');
var http = require('http');

var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static( __dirname + '/static' ));


app.get('/', function(req, res){
    res.redirect('/posts');
});

app.get('/confirmdelete/:id', function(req, res){
    res.render('confirm.jade', { id: req.params.id });
});

app.post('/editpost/:id', function(req, res){
	console.log( req.body );
	client.end();
	res.render('posted.jade', { action: 'edit' });
});

