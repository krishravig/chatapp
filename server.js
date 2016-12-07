var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoChat = require('./app/mongo_chat');

var ip = "127.0.0.1";
var port = 3000;
var users = {};
var WhisperChek = false;
var storage=[];
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendfile('index.html');
});

io.on('connection', function(socket){ 
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('botMessage', function(from, msg){
    io.emit('botMessage', from, msg);
  });
});


http.listen(port,ip, function () {
    console.log('listening on *:3000');
});
