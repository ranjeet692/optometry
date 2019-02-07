var mongoose = require('mongoose');
var Muscle= mongoose.model('Muscle');
var util = require('../util/random.js')();

module.exports = function () {
    global.app.post('/muscle/add', function (req, res) {
        var muscle = new Muscle();
        muscle.id = util.generateId();
        muscle.name = req.body.name;
        muscle.description = req.body.description;
        muscle.save(function(err) {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200);
            res.json({
                "message" : "Data saved successfully",
            });
        });
    });

    global.app.get('/muscle/get', function (req, res) {
        Muscle.find({}, function(err, muscles) {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200);
            res.json({
                "message" : "Data fetched successfully",
                "data": muscles
            });
        });
    });

    global.app.get('/muscle/get/:id', function (req, res) {
        var id = req.query.id;
        Muscle.findById({id: id}, function(err, muscle) {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200);
            res.json({
                "message" : "Data fetched successfully",
                "data": muscle
            });
        });
    });
};