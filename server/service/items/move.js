var db = require('../../persistance/mysql');

module.exports = {
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
};
