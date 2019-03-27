module.exports = function Route(app, server) {
    //this get the socket.io module
    const io = require("socket.io").listen(server);
    //root route to render the index.ejs view
    app.get('/', (req, res) => {
        res.render('index', { title: "Real time color" });
    });
    //listen to connection event from the client side
    let color;
    io.on('connection', (socket) => {
        console.log("Incoming socket connection");
        io.emit('color', color)
        socket.on('green', () => {
            color = "green";
            io.emit('color', color);
        });
        socket.on('blue', () => {
            color = "blue";
            io.emit('color', color);
        });
        socket.on('pink', () => {
            color = "pink";
            io.emit('color', color);
        });
    });
};
