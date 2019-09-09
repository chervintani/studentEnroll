module.exports = function (request, response) {
    store2 = "";
    request.on('data', function (request) {
        store2 = JSON.parse(request);
        file = store2.subject.replace(" ", "-").toLowerCase();

        fs.appendFile('epmloyee.csv', store2.name + "," + store2.email + "," + store2.course + "\n", function (err) {
            if (err) throw err;
            console.log(file + ' is saved!');
        });

    })
    // console.log("WORKING");
}