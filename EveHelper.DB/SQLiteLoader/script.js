const SqliteToJson = require('sqlite-to-json');
const sqlite3 = require('sqlite3');
const exporter = new SqliteToJson({
    client: new sqlite3.Database('./sqlite-latest.sqlite')
});


exporter.tables(function(err, tables) {
    var parts = [];
    while (tables.length > 0)
        parts.push(tables.splice(0, 3));

    ProcessPart(0, parts);
});

function ProcessPart(index, parts) {
    var part = parts[index];
    if (!part) return;

    process.stdout.write("Parsing part " + index + "/" + parts.length + "\t" + part.toString() + "\r");

    var partCount = part.length;
    for (table of part) {
        exporter.save(table, './data/' + table + '.json', function(err) {
            if (err) {
                console.log("Error", err);
            }
            if (--partCount == 0) {

                process.stdout.clearLine();
                ProcessPart(index + 1, parts);
            }
        });
    }
}