var port = 8081;
var http = require("http");
var fs = require('fs');
var url = require('url');
// var csv = require('fast-csv');
// var enroll = require('./enroll');
var addtable = require('./addTable');
http.createServer(function (request, response) {

    response.setHeader("Content-Type", "text/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    var store2 = '';
    var classFile = "";
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
        list.push(q.pathname.split("/"));
        classFile = list[0][2];
        filename = classFile + '.csv';

        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                return response.end("404 Not Found");
            }
            var info = "<tbody>";
            var content = "</tbody></table></body></html>";
            var table = "<html><head>" +
                "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>" +
                "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>" +
                "<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script>" +
                "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>" +
                "<title>Document</title></head><body><div class='jumbotron'><table class='table'><tr scope='row' style='background: #26548c; color: white'><thead class='thead-dark'><h1><td scope='col'>Name</td>" +
                "<td scope='col'>Email</td><td scope='col'>Course</td></h1></tr></thead></div></body>"+
                
                "<script>$(document).ready(function(){"+
                "$('.table tr:last').remove();"+
                "})</script>";

            var a = data.split('\n').join(',');
            var b = a.split(',');
            var counter = 0;
 
            for (var i = 0; i < b.length / 3; ++i) {
                info += "<tr><td>" + b[counter] + "</td><td>" + b[counter + 1] + "</td><td>" + b[counter + 2] + "</td></tr>";
                counter += 3;
            }
            table += info + content;

            console.log(b);
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(table);
            return response.end();
        });



    }


    request.on('data', function (request) {
        store2 = JSON.parse(request);
        file = store2.subject.replace(" ", "-").toLowerCase();

        fs.appendFile(file + '.csv', store2.name + "," + store2.email + "," + store2.course + "\n", function (err) {
            if (err) throw err;
            console.log(file + ' is saved!');
        });


        // fs.createWriteStream(file+'.csv');
        // csv.write ([
        //     [store2.name,store2.email,store2.course]
        // ])

    });
    request.on('end', function () {

    })


}).listen(port);
console.log("Initializing server port " + port);
