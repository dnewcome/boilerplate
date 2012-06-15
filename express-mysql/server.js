var express = require('express');
var http = require('http');
var getClient = require('./getclient.js').getClient;

var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static( __dirname + '/static' ));

/**
* rendered html pages
*/

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


/**
* JSON api
*/

app.get('/foo/:id', function(req, res){
	// querystring arg is in req.query.arg
	// url arg is in req.params.arg

	var client = getClient();
	client.query(
		'select * from foo where id=?', 
		[req.params.id], 
		function( err, results ) { 
			res.send( results );
			client.end();
	});
});

app.post('/foo', function(req, res){
	// post data is in req.body
	// note: set content type to application/json

	var client = getClient();
	client.query(
		'insert into foo (text, create_dt) values (?, utc_timestamp())', 
		[req.body.text], 
		function( err, results ) { 
			res.send( results );
			client.end();
	});
});


app.listen(3000);
