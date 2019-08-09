/* Entry point into the server */

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var colors = require('colors');
var clear = require('clear');

var clientInterface = require('./clientInterfacer')

/* Staticly serve everything, terribly unsafe */
app.use(express.static('.'))

/* Client connections in interface file */
io.on('connection', socket => clientInterface.clientJoin( socket, io) )

/* Start game loop */
setInterval( () => clientInterface.gameUpdate(io), 20 )

/* Serve server */
clear()
http.listen(3000, () => console.log('\n\n\nServer open'.green));

/* Server commands */
