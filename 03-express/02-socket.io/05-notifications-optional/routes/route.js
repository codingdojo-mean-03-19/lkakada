module.exports = function Route(app, server) {
    //this get socket io module
    const io = require('socket.io').listen(server);
    //root route to render the index.ejs view
    app.get('/', (req, res) => {
        res.render('index', { title: "Socket Notification" });
    });
    //connect socket
    io.on('connection', (socket) => {
        socket.on('notification', () => {
            io.emit('notification_join', { id: socket.id })
        });

        socket.on('notification_triggered', () => {
            io.emit('notification_triggered', { id: socket.id });
        });

        socket.on('disconnect', () => {
            io.emit('notification_leave', { id: socket.id });
        });

    });

}