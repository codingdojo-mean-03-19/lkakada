const fs = require('fs'),
    http = require('http'),
    port = 5000;

const server = http.createServer(function server(request, response) {
    // Figure out which file the HTTP request is looking for
    let file;

    switch (request.url) {
        case "/":
            file = "index.html"
            break;
        case "/ninjas":
            file = "ninjas.html"
            break;
        case "/dojos/new":
            file = "dojo.html"
            break;
        default:
            file = null;
            break;
    }
    // Send file or error to browser
    if (file !== null) {
        // First argument uses string interpolation
        fs.readFile(`static/${file}`, 'utf8', function (error, contents) {
            if (error) {
                console.log(error);
            }
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(contents);
            response.end();
        });
    } else { // If file is null, not found
        response.writeHead(404);
        response.end("File not found!");
    }
});

server.listen(port, function () {
    console.log("Running on port: ", port);
});