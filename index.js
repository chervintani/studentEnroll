
var fs = require('fs');
var url = require('url');
var addtable = require('./addTable');
var addfile = require('./addFile');
const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const http = require('http').Server(app);



app.all('/enroll', function (req, res) {
    res.sendFile(path.join(__dirname, 'view/studentEnroll.html'));
    addfile(req)
});

app.get('/', function (req, res, next) {
    var err = new Error("Something went wrong ha");
   next(err);
   return false;
});

app.all('/class/chervintani', function (req, res) {
    var list = [];
    var url = '/class/chervintani';
    addtable(req,res,list,url);
    // res.send(path.join('Hello!'));
    // addtable(req, res, list);
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

