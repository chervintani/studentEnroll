module.exports = function (request) {
    var fs = require('fs');
    var store2 = '';

    request.on('data', function (request) {
        store2 = JSON.parse(request);
        file = store2.subject.split(" ").join("-").toLowerCase();
        fs.appendFile(file + '.csv', store2.name + "," + store2.email + "," + store2.course + "\n", function (err) {
            if (err) throw err;
            console.log(file + ' is saved!');
        });
    });
    request.on('end', function () {
    })
}