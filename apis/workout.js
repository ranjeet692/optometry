var mongoose = require('mongoose');
var Workout = mongoose.model('Workout');
var util = require('../util/random.js')();

module.exports = function () {
    global.app.post('/workout/add', function (req, res) {
        var workout = new Workout();
        workout.id = util.generateId();
        workout.exercise = req.body.exercise;
        workout.weight = req.body.weight;
        workout.reps = req.body.reps;
        workout.date = req.body.date;
        workout.userid = req.body.userid;
        workout.save(function(err) {
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

    global.app.get('/workout/get/:userid', function (req, res) {
        Workout.find({userid: req.params.userid}, null, {sort: {date: -1}}, function(err, exercises) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data fetched successfully",
                    "data": exercises
                });
            }
        });
    });

    global.app.get('/workout/get/:userid/:date', function (req, res) {
        var userid = req.params.userid;
        var date = req.params.date;
        var startDate = new Date(date);
        var endDate = new Date(startDate.getTime() + (1*24*60*60*1000));
        Workout.find({userid:userid, date: {
            $gt: startDate,
            $lte: endDate
        }}, null, {sort: {date: -1}}, function(err, exercises) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data fetched successfully",
                    "data": exercises
                });
            }
        });
    });
};