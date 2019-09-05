var port = 8081;
var http = require("http");
var fs = require('fs');

http.createServer(function (request, response) {

    response.setHeader("Content-Type", "text/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    var store = '';

    request.on('data', function (request) {
        store = JSON.parse(request);
        // console.log(store)
    });

    request.on('end', function () {
        // console.log(store);

        if (fs.existsSync(store.subject + '.txt')) {

            fs.readFile(store.subject + '.txt', function (err, data) {
                if (err) throw err;
                if (data.includes(store.name)) {
                    console.log("Name already existed! Name will not be added to the class")
                }else{
                    fs.appendFile(store.subject + '.txt', store.name + "\r\n", function (err) {
                        if (err) throw err;
                        console.log('saved!');
                    });
                }
            });

            
        } else {
            fs.writeFile(store.subject + '.txt', store.name + "\r\n", function (err) {
                if (err) throw err;
                console.log(store.subject + ' is created!');
            });
            // response.end("Hi!")
        }

        


    });




}).listen(port);

console.log("Initializing server port " + port);
