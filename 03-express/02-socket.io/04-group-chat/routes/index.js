module.exports = function Route(app, server) {
    //this get the socket.io module
    const io = require("socket.io").listen(server);
    //root route to render the index.ejs view
    app.get('/', (req, res) => {
        res.render('index', { title: "Chat group" });
    });
    const connections = [];
    const users = {};
    const messages = {};

    //connect socket
    io.on('connection', (socket) => {
        connections.push(socket);
        console.log(`Connected: ${connections.length} socket connected.`)

        //handle new messages
        socket.on('new_message', (data) => {
            console.log(data)
            messages[socket.id] = { user: data.user, msg: data.msg };
            io.emit('new_message', messages[socket.id]);
        });

        //handle new members and existing message
        socket.on('new_member', (data) => {
            users[socket.id] = { user: data.user };
            socket.emit('existing_msg', messages);
            io.emit('new_member', data);
        });
        //disconnect
        socket.on('disconnect', (data) => {
            connections.splice(connections.indexOf(socket), 1);
            console.log(`Disconnected ${connections.length} sockets connected.`)
            io.emit('user_disconnect', users[socket.id]);
        });
    });
};