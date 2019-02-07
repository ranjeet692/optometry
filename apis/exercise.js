var mongoose = require('mongoose');
var Exercise = mongoose.model('Exercise');
var util = require('../util/random.js')();
module.exports = function () {
    global.app.post('/exercise/add', function (req, res) {
        var name = req.body.name;
        var muscle = req.body.muscle;
        var userid = req.body.userid;
        var exercise = new Exercise();
        exercise.id = util.generateId();
        exercise.name = name;
        exercise.muscle = muscle;
        exercise.userid = userid;
        exercise.save(function(err) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data saved successfully",
                });
            }
        });
    });

    global.app.get('/exercise/get', function (req, res) {
        Exercise.find({}, function(err, exercises) {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200);
            res.json({
                "message" : "Data fetched successfully",
                "data": exercises
            });
        });
    });

    global.app.get('/exercise/get/:userid', function (req, res) {
        var userid = req.params.userid;
        Exercise.find({userid: userid}, function(err, exercise) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data fetched successfully",
                    "data": exercise
                });
            }
        });
    });
};