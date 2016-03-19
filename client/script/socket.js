// socket.js
// Contains websocket logic as well as poviding a means to initiate socket.io

// Test to ensure websocket communications is working correctly
var socket = io.connect('http://leehorobin.com:8080');

socket.on('connection', function(){
	console.log('working');
	socket.emit('connected');
});