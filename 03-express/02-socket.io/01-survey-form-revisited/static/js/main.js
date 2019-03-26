$.noConflict();
$(document).ready(function () {
    // triggers the connection event in our server!
    var socket = io.connect();
    // submit data to the server using emit
    $('#survey_form').submit(function (e) {
        e.preventDefault();
        socket.emit("posting_form", {
            name: $('#name').val(),
            location: $('#location').val(),
            language: $('#language').val(),
            comment: $('#comment').val()
        });
    });
    //display the emit response of the server called "updated_message" and "random_number"
    socket.on('updated_message', function (data) {
        $('#message').html("You emitted the following information to the server: " + JSON.stringify(data.response));
    });
    socket.on('random_number', function (data) {
        $('#number').html("Your lucky number emitted by the server is : " + JSON.stringify(data.response));
    });
});