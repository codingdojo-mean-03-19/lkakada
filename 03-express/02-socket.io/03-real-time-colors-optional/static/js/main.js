$.noConflict();
$(document).ready(function () {
    let socket = io();
    $('#green').click(() => {
        socket.emit('green', () => {

        });
    });
    $('#blue').click(() => {
        socket.emit('blue', () => {

        });
    });
    $('#pink').click(() => {
        socket.emit('pink', () => {

        });
    });
    socket.on('color', (color) => {
        $('body').css('background-color', color);
    });
});