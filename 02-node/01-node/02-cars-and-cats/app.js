const http = require('http'),
    fs = require('fs');
const server = http.createServer(function (request, response) {
    //Split the url in order to examine it better
    const splitURL = request.url.split('/'),
        fileType = splitURL[1],
        file = splitURL[2];
    switch (fileType) {
        case "styles":
            serveCSS(file, response);
            break;
        case "images":
            serveJPG(file, response);
            break;
        default:
            //Serve an html file
            switch (fileType) {
                case "cars": //if firstChunk is 'cars', could be one of two routes.
                    if (file === "new") {
                        serveHTML("new.html", response);
                    } else {
                        serveHTML("cars.html", response);
                    }
                    break;
                case "cats":
                    serveHTML("cats.html", response);
                    break;
                default:
                    serve404(response);
            }
    }
});

function serveHTML(filename, response) {
    //read a particular file..
    fs.readFile(`views/${filename}`, 'utf8', function (error, contents) {
        //check to see if an error exists
        if (error) {
            return serve404(response)
        };
        response.writeHead(200, { 'Context-type': 'text/html' });
        response.write(contents);
        response.end();
    });
}

function serveCSS(filename, response) {
    //read a particular file..
    fs.readFile(`stylesheets/${filename}`, 'utf8', function (error, contents) {
        //check to see if an error exists
        if (error) {
            return serve404(response)
        };
        response.writeHead(200, { 'Context-type': 'text/css' });
        response.write(contents);
        response.end();
    });
}

function serveJPG(filename, response) {
    //read a particular file..
    fs.readFile(`images/${filename}`, function (error, contents) {
        //check to see if an error exists
        if (error) {
            return serve404(response)
        };
        response.writeHead(200, { 'Context-type': 'image/jpg' });
        response.write(contents);
        response.end();
    });
}
function serve404(response) {
    response.writeHead(404);
    response.end("File not found");
}

server.listen(7077);
console.log("Running on 7077");