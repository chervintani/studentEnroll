
var addtable = require('./src/addTable');
var addfile = require('./src/addFile');
const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const http = require('http').Server(app);

app.all('/enroll', function (req, res) {
    res.sendFile(path.join(__dirname, 'view/studentEnroll.html'));
    addfile(req)
});

app.all('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'view/studentEnroll.html'));
});

app.all('/class/:id', function (req, res) {
    var list = [];
    var data = req.params.id;
    addtable(res, list, data);
});

http.listen(port, () => {
    console.log('listening on port ' + port);

});

// http.createServer(function (request, response) {
//     response.setHeader("Content-Type", "text/json");
//     response.setHeader("Access-Control-Allow-Origin", "*");

//     var list = [];
//     var q = url.parse(request.url, true);
//     var filename = "." + q.pathname;
//     if (q.pathname == "/enroll") {
//         filename = "studentEnroll.html"
//         fs.readFile(filename, function (err, data) {
//             if (err) {
//                 response.writeHead(404, { 'Content-Type': 'text/html' });
//                 return response.end("404 Not Found");
//             }
//             response.writeHead(200, { 'Content-Type': 'text/html' });
//             response.write(data);
//             return response.end();
//         });

//     } else if (q.pathname.indexOf("/class") >= 0) {
//         addtable(request, response, list, q);
//     }
//     addfile(request);
// // }).listen(port);
// // console.log("Initializing server at port " + port);

