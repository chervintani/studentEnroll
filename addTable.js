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
                "<div class='imgbox'><img class='center-fit' src='https://previews.dropbox.com/p/thumb/AAiVYsgTzha2dhORKrk8ShfvBmQrRzGtro5vPd9hCLK2XYJgeVH06IJbxCfrsuhh5XbB0N5SFU-7vj0xk9PCb3KNvwO4_J_2w3zX_0UdkGkEYdUAn4EOkQBo-WmYHOFsJaLr_4ckXK_ZEPcMy6-gqmAdrrzyXa63uqnYZgsvYDOePie1X0MSxu-qrukHOU9Q4HbJyt1bpQhmiXFWdnxgEndNUzi1CYyfO4WX0qH3rdGZtaE3vEp_uEoIb67W-F7VV_TyJv9lI-kCtv4-XqBYOc8IG-b8L_e-DjWUCA3PoIYPt7ZanuxDte_Wycd8Af4RfmYsxBgMGM1z-vaT_-i7S94e2MyRc8FyY-VLpjriOaGYAA/p.jpeg?fv_content=true&size_mode=5'></html>");
        }
        var info = "<tbody>";
        var content = "</tbody></table></body></html>";
        var table = "<html><head>" +
            "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>" +
            "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>" +
            "<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script>" +
            "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>" +
            "<link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'>" +
            "<style>table {border-collapse: collapse;border-spacing: 0;width: 100%;border: 1px solid #ddd;}" +
            "th, td {text-align: left;padding: 16px;}" +
            "tr:nth-child(even) {background-color: #f2f2f2}" +
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