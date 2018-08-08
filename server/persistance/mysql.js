var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'mysql',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'utatinventory'
});

connection.connect()

var sql = `CREATE TABLE inventory (
  id int(11) NOT NULL AUTO_INCREMENT,
  alternate_id text,
  name text NOT NULL,
  status text NOT NULL,
  description text,
  category text,
  picture_url text,
  PRIMARY KEY (id)
)`;
connection.query(sql, function (err, result) {
    console.log(err)
});

module.exports = {
    addItem: function (alt_id, name, status, description, category, picture_url, callback) {
        var sql = `INSERT INTO inventory 
        (alternate_id, name, status, description, category, picture_url)
        VALUES
        ("` + alt_id + `","` + name + `","` + status + `","` + description + `","` + category + `","` + picture_url + `")`;
        connection.query(sql, function (err, result) {
            callback(result["insertId"], err)
        });
    },

    updateItem: function (id, alt_id, name, status, description, category, picture_url, callback) {
        var sql = `UPDATE inventory 
        SET alternate_id = "` + alt_id + `",
        name = "` + name + `", 
        status = "` + status + `",
        description = "` + description + `", 
        category = "` + category + `",
        picture_url = "` + picture_url + `"
        WHERE id = ` + id;
        connection.query(sql, function (err, result) {
            if (result["affectedRows"] === 0) {
                callback("item not found");
                return
            }

            callback(err)
        });
    },

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

    deleteItem: function (id, callback) {
        var sql = `DELETE from inventory
            WHERE id = ` + id;
        connection.query(sql, function (err, result) {
            if (result["affectedRows"] === 0) {
                callback("item not found");
                return
            }

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
