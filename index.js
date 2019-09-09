var port = 8081;
var http = require("http");
var fs = require('fs');
var url = require('url');
// var csv = require('fast-csv');

http.createServer(function (request, response) {

    response.setHeader("Content-Type", "text/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    var store = '';
    var classFile = "";
    var list = [];
    var q = url.parse(request.url, true);
    var filename = "." + q.pathname;
    if (q.pathname == "/") {
        filename = "studentEnroll.html"
    } else if (q.pathname.indexOf("/class") >= 0) {
        list.push(q.pathname.split("/"));
        classFile = list[0][2]
        filename = classFile + ".csv"
    }


    fs.readFile(filename, function (err, data) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            return response.end("404 Not Found");
        }
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        return response.end();
    });

    request.on('data', function (request) {
        store = JSON.parse(request);
        file = store.subject.replace(" ","-").toLowerCase();
        
        fs.appendFile(file + '.csv', store.name + "," + store.email + "," + store.course + "\n", function (err) {
            if (err) throw err;
            console.log(file+' is saved!');
        });
        // fs.createWriteStream(file+'.csv');
        // csv.write ([
        //     [store.name,store.email,store.course]
        // ])

    });
    console.log(store);
    request.on('end', function () {

    });
}).listen(port);
console.log("Initializing server port " + port);
