$.noConflict();
$(document).ready(function () {
    let socket = io.connect();

    socket.emit('notification');

    $('#notify_everyone').click((data) => {
        socket.emit('notification_triggered', { data });
    });
    //when new user connect to server.
    socket.on('notification_join', (data) => {
        $('#notify').append(`<li>Socket ID <b>${data.id}</b> joined us!`);
    })
    //when user leave the server. 
    socket.on('notification_leave', (data) => {
        $('#notify').append(`<li>Socket ID <b>${data.id}</b> left us!`);
    });

    //when user trigger the server. 
    socket.on('notification_triggered', (data) => {
        $('#notify').append(`<li>Socket ID <b>${data.id}</b> just triggered a notification!`);
    });


});