'use strict';

var socket = io();


$(function(){

    $("#addClass").click(function () {
        $('#qnimate').addClass('popup-box-on');
        $('#messages').empty();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8055/sampleapp/message',
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

    $(".popup-messages .direct-chat-messages").animate({ scrollTop: $(this).height() }, "slow");
        return false;

    // $("#input_message").keyup(function(event){
    //     if(event.keyCode == 13){
    //         document.getElementById("submit").onclick();
    //         //$("#submit").onclick();
    //         //return submitfunction();
    //     }
    // });


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
 
socket.on('chatMessage', function(from, msg){
  //var me = $('#user').val();
    var color = 'green';
  //var color = (from == me) ? 'green' : '#009afd';
  //var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
  console.log($.support.cors);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8055/sampleapp/message',
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
    var from ="Paul";
    socket.emit('botMessage', from, res);

}
socket.on('botMessage', function(from, msg){
    //var me = $('#user').val();
    var color = 'blue';
    //var color = (from == me) ? 'green' : '#009afd';
    //var from = (from == me) ? 'Me' : from;
    $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});



 
