var express = require('express');

var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static( __dirname + '/static' ));

app.get('/foo/:id', function(req, res){
	res.send( {"hello": req.params.id } );
	client.end();
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
