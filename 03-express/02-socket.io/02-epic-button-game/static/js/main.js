$.noConflict();
$(document).ready(function () {
    let socket = io();
    $('#epic').click(() => {
        socket.emit('epic_pressed', () => {
        });
    });
    $('#reset').click(() => {
        socket.emit('epic_reset', () => {
        });
    });
    socket.on('updated_message', (number) => {
        $('#number').html(number);
    });
});