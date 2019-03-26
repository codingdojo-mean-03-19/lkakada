module.exports = function Route(app, server) {
    //this get the socket.io module
    const io = require('socket.io').listen(server);
    //root route to render the index.ejs view
    app.get('/', (req, res) => {
        res.render('index', { title: 'Epic Number Game' });
    });
    //listen to connection even from the client side
    let counter = 0;
    const resetCount = 0;
    io.on('connection', (socket) => {
        console.log("incomming socket connection");
        io.emit('updated_message', counter);
        socket.on('epic_pressed', () => {
            counter++;
            io.emit('updated_message', counter);
        });
        socket.on('epic_reset', () => {
            counter = 0;
            io.emit('updated_message', counter);
        });
    });
}