const SqliteToJson = require('sqlite-to-json');
const sqlite3 = require('sqlite3');
const exporter = new SqliteToJson({
    client: new sqlite3.Database('./sqlite-latest.sqlite')
});


exporter.tables(function(err, tables) {
    // var parts = [];
    // while (tables.length > 0)
    //     parts.push(tables.splice(0, 1));

    ProcessPart(0, tables);
});

function ProcessPart(index, tables) {
    var table = tables[index];
    if (!table) return;

    console.time(table);
    process.stdout.write(table + ": " + index + "/" + tables.length + "\r");

    exporter.save(table, './data/' + table + '.json', function(err) {
        if (err) {
            console.log("Error", err);
        }
        process.stdout.clearLine();
        console.timeEnd(table);
        ProcessPart(index + 1, tables);
    });
}