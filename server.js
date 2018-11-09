const _ = require('underscore');
const http = require('http');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const port = process.env.PORT || process.env.PORT_WEB || 3010;
server.listen(port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'text/plain', limit:'50mb'}));
app.use('/',express.static(__dirname+'/static'));
app.use('/',express.static(__dirname+'/public'));
app.use('/',express.static(__dirname+'/blocks'));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	if (req.method === 'OPTIONS') {
		return res.send(200);
	}
	else {
		return next();
	}
});

app.on('error', function(error){
  console.log(error);
  if(error.code == 'EADDRINUSE') {
  	logger.log('debug',{err:error.code});
    console.log(error.code);
  }
});

io.on('connect', function(s) {
	console.log('connected');
	
	// setCurrentMetapodData();
	// io.emit('join','ar.metapod')
});

io.on('message', function(data) {
});