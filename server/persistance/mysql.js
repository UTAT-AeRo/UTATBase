var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'wattpad.io',
    port: '9998',
    user: 'root',
    password: 'passworddev',
    database: 'utatinventory'
});

connection.connect()

module.exports = {
    moveItem: function (id, check_in, callback) {
        var status = "OUT";
        if (check_in === true) {
            status = "IN"
        }

        var sql = `UPDATE inventory
            SET status = "` + status + `"
            WHERE id = ` + id;
        connection.query(sql, function (err, result) {
            callback(err)
        });
    },

    searchItems: function (id, altID, name, category, callback) {
        // Hacky hack hack
        if (id === undefined) {
            id = "-1"
        }

        connection.query(`SELECT * FROM inventory
        WHERE id = ` + id + `
        OR alternate_id = "` + altID + `"
        OR name LIKE "` + name + `"
        OR category LIKE "` + category + `"
        `, function (err, rows, fields) {
            callback(rows, err)
        })
    },
};

//connection.end()
