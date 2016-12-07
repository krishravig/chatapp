'use strict';

var socket = io();


$(function(){
    $("#addClass").click(function () {
        $('#qnimate').addClass('popup-box-on');
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/message',
            //data: {'message':"Hello"},
            success: function (data) {
                // use data
                console.log("successful response" +data);
                botResponse(data);

            },
            error:function(err) {
                console.log(err);
            }
        });

    });

    $("#removeClass").click(function () {
        $('#qnimate').removeClass('popup-box-on');
    });
})
function submitfunction(){
  //var from = $('#user').val();
    var from = "me";

    var message = $('#input_message').val();
  if(message != undefined) {
  socket.emit('chatMessage', from, message);
}
$('#input_message').val('').focus();
 return false;
}
 
function notifyTyping() { 
  //var user = $('#user').val();
  socket.emit('notifyUser', user);
}
 
socket.on('chatMessage', function(from, msg){
  //var me = $('#user').val();
    var color = 'green';
  //var color = (from == me) ? 'green' : '#009afd';
  //var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
  console.log($.support.cors);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8000/message',
	    data: {'message':msg},
        success: function (data) {
            // use data
            console.log("successful response" +data);
            botResponse(data);

        },
        error:function(err) {
            console.log(err);
        }
    });



});

function botResponse(res) {
    var from ="bot";
    socket.emit('botMessage', from, res);

}
socket.on('botMessage', function(from, msg){
    //var me = $('#user').val();
    var color = 'blue';
    //var color = (from == me) ? 'green' : '#009afd';
    //var from = (from == me) ? 'Me' : from;
    $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});


socket.on('notifyUser', function(user){
  //var me = $('#user').val();
  //if(user != me) {
   // $('#notifyUser').text(user + ' is typing ...');
  //}
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});
 
// $(document).ready(function(){
//   var name = makeid();
//   $('#user').val(name);
//   socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
// });
//
// function makeid() {
//   var text = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//
//   for( var i=0; i < 5; i++ ) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }
