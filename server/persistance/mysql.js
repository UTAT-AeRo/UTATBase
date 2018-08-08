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
    checkInItem: function (req, res) {
        var id = req.body.id

        connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
            if (err) throw err

            console.log('The solution is: ', rows[0].solution)
        })
    },

    searchItems: function (id, altID, name, category, callback) {
        // Hacky hack hack
        if (id === undefined) {
            id = "-1"
        }

        connection.query(`SELECT * FROM inventory
        WHERE id = ` + id + `
        OR alternate_id = "` + altID.toLowerCase() + `"
        OR name LIKE "` + name.toLowerCase() + `"
        OR category LIKE "` + category.toLowerCase() + `"
        `, function (err, rows, fields) {
            callback(rows, err)
        })
    },
};

//connection.end()
