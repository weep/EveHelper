const SqliteToJson = require('sqlite-to-json');
const sqlite3 = require('sqlite3');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://eve:pw@localhost/evehelper_db";

const exporter = new SqliteToJson({
    client: new sqlite3.Database('./sqlite-latest.sqlite')
});

exporter.tables(function(err, tables) {
    ProcessPart(0, tables);
});

function ProcessPart(index, tables) {
    var table = tables[index];
    if (!table) return;

    console.time(table);
    process.stdout.write(table + ": " + index + "/" + tables.length + "\r");
    var filePath = './data/' + table + '.json';

    exporter.save(table, filePath, function(err) {
        if (err) {
            console.log("Error", err);
        }
        process.stdout.clearLine();
        console.timeEnd(table);
        MongoImport(filePath, table);
        ProcessPart(index + 1, tables);
    });
}

function MongoImport(filePath, table) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        db.createCollection(table, function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            ImportFile(filePath, table, db);
            
        });
    }); 
}

function ImportFile(filePath, table, db) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) throw err;
        var json = JSON.parse(data);

        db.collection(table).insertMany(json, function (err, res) {
            console.log("Completed: " + table);
        });
    });
}