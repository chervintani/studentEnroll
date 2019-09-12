module.exports = function (req) {
    var fs = require('fs');
    var store2 = '';

    req.on('data', function (req) {
        store2 = JSON.parse(req);
        file = store2.subject.split(" ").join("-").toLowerCase();
        fs.appendFile(file + '.csv', store2.name + "," + store2.email + "," + store2.course + "," + store2.year + "\n", function (err) {
            if (err) throw err;
            console.log(file + ' is saved!');
        });
    });
    req.on('end', function () {
    })
}