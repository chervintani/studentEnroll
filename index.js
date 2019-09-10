var port = 8081;
var http = require("http");
var fs = require('fs');
var url = require('url');
var addtable = require('./addTable');
var addfile = require('./addFile');

http.createServer(function (request, response) {
    response.setHeader("Content-Type", "text/json");
    response.setHeader("Access-Control-Allow-Origin", "*");

    var list = [];
    var q = url.parse(request.url, true);
    var filename = "." + q.pathname;
    if (q.pathname == "/") {
        filename = "studentEnroll.html"
        fs.readFile(filename, function (err, data) {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                return response.end("404 Not Found");
            }
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            return response.end();
        });

    } else if (q.pathname.indexOf("/class") >= 0) {
        addtable(request, response, list, q);
    }
    addfile(request);
}).listen(port);
console.log("Initializing server at port " + port);