var db = require('../../persistance/mysql');

module.exports = {
    addItem: function (req, res) {
        if (req.body.alternate_id === undefined || req.body.name === undefined || req.body.status === undefined ||
            req.body.description === undefined || req.body.category === undefined || req.body.picture_url === undefined) {
            res.status(400);
            res.send("missing something in the body");
            return
        }

        if (req.body.id === undefined) {
            db.addItem(req.body.alternate_id, req.body.name, req.body.status, req.body.description, req.body.category, req.body.picture_url, function (id, err) {
                if (err) {
                    res.status(500);
                    res.send(err);
                    return
                }

                res.send(`{"id":` + id + `}`)
            })
        } else {
            db.updateItem(req.body.id, req.body.alternate_id, req.body.name, req.body.status, req.body.description, req.body.category, req.body.picture_url, function (err) {
                if (err) {
                    res.status(500);
                    res.send(err);
                    return
                }

                res.send("OK")
            })
        }
    },

    moveItems: function (req, res) {
        if (req.body.direction === undefined || req.body.id === undefined) {
            res.status(400);
            res.send("missing id or direction in body");
            return
        }

        if (req.body.direction !== "in" && req.body.direction !== "out") {
            res.send("invalid direction");
            res.status(400);
            return
        }

        var check_in = req.body.direction === "in";

        db.moveItem(req.body.id, check_in, function (err) {
            if (err) {
                res.status(500);
                res.send(err);
                return
            }

            res.send("OK")
        })
    },

    deleteItem: function (req, res) {
        if (req.query.id === undefined) {
            res.status(400);
            res.send("missing id in body");
            return
        }

        db.deleteItem(req.query.id, function (err) {
            if (err) {
                res.status(500);
                res.send(err);
                return
            }

            res.send("OK")
        })
    }
};
