$.noConflict();
$(document).ready(function () {
    let socket = io.connect();
    let messageInput = $('#message-input')
    let name = '';
    //prompt for the user name
    const new_user = () => {
        name = prompt("Enter your name:");
        if (name == "" || name == null) {
            new_user();
            return true;
        }
        socket.emit("new_member", { user: name });
    };

    new_user();

    //handle message when clicking send
    $('#message').click((e) => {
        e.preventDefault();
        //ensure message is not empty
        if (messageInput.val().length > 0 && name.length > 0) {
            socket.emit('new_message', { user: name, msg: messageInput.val() });
            messageInput.val('');
        };
    });
    // handle receiving new messages
    socket.on('new_message', (data) => {
        $('#messages').append(`<li class="text-muted"><b>${data.user}</b>: ${data.msg}</li>`);
    });

    // handle members joining
    socket.on('new_member', (data) => {
        $('#messages').append(`<li class="text-success"><b>${data.user}</b>: has joined the room.</li>`);
    });

    // handle existing message
    socket.on('existing_msg', function (data) {
        for (i in data) {
            $('#messages').append(`<li class="text-muted"><b>${data[i].user}</b> : ${data[i].msg}</li>`);
        }
    });

    // handle members leaving
    socket.on('user_disconnect', function (data) {
        $('#messages').append(`<li class="text-danger"><b>${data.user}</b>: has left the room.</li>`);
    });

});