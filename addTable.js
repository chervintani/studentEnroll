module.exports = function (request, response, list,q) {
    var fs = require('fs');
    var classFile="";
    
    list.push(q.pathname.split("/"));
    classFile = list[0][2];
    filename = classFile + '.csv';
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            return response.end("<html><style> * {" +
                "margin: 0;padding: 0;}" +
                ".imgbox {display: grid;height: 100%;}" +
                ".center-fit {" +
                "max-width: 100%;max-height: 100vh;margin: auto;}</style>" +
                "<div class='imgbox'><img class='center-fit' src='https://i.imgur.com/a4tdisi.jpg'></html>");
        }
        var info = "<tbody>";
        var content = "</tbody></table></body></html>";
        var table = "<html><head>" +
            "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>" +
            "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>" +
            "<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script>" +
            "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>" +
            "<link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'>" +
            "<style>body{background-image: url('https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'); background-repeat:no-repeat;"+

            "background-size:cover;}table {border-collapse: collapse;border-spacing: 0;width: 100%;border: 1px solid #ddd;background-image: url('https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'); background-repeat:no-repeat; background-size:cover;}" +
            "th, td {text-align: left;padding: 16px;}" +
            "tbody {background-color: #f2f2f2}" +
            // "tr:nth-child(even) {background-color: #f2f2f2}" +
            "</style>" +
            "<title>Document</title></head><body style='font-style: 'Comfortaa''><div class='jumbotron text-center'>" +
            "<h1 class='text-center'>" + classFile.toUpperCase() + " Class</h1><br>" +
            "<table class='table'><tr scope='row'><thead class='thead-dark'><td scope='col'><b>Name</b></td>" +
            "<td scope='col'><b>Email</b></td><td scope='col'><b>Course</b></td></tr></thead></div></body>" +

            "<script>$(document).ready(function(){" +
            "$('.table tr:last').remove();" +
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