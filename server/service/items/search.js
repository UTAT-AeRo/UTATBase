var db = require('../../persistance/mysql');

module.exports = {
    searchItem: function (req, res) {
        db.searchItems(req.query.id, req.query.alt_id, req.query.name, req.query.category, function (rows, err) {
            if (err) {
                res.status(500);
                res.send(err);
                return
            }

            res.send(rows)
        })
    },
};
