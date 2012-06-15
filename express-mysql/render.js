var express = require('express');
var http = require('http');
var getClient = require('./getclient.js').getClient;

var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static( __dirname + '/static' ));


app.get('/', function(req, res){
    res.redirect('/posts');
});

app.get('/confirmdelete/:id', function(req, res){
    res.render('confirm.jade', { id: req.params.id });
});

app.get('/editpost/:id', function(req, res){
	console.log( "edit a post");
	var client = getClient();
	client.query(
		'select * from post where id = ?', 
		[ req.params.id ], 
		function( err, results ) { 
			console.log( results );
			client.end();
			res.render('editpost.jade', { post: results[0] });
	});
});

app.post('/editpost/:id', function(req, res){
	console.log( req.body );
	var client = getClient();
	client.query(
		'update post set title = ?, body = ? where id = ?', 
		[req.body.title, req.body.body, req.params.id], 
		function( err, results ) { 
			client.end();
			// using flash requires session support
			// req.flash('post updated');
			res.render('posted.jade', { action: 'edit' });
	});
});

