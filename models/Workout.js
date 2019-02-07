var mongoose = require('mongoose');

const Workout = new mongoose.Schema({
    id: {type: String, unique:true, required:true, index:true},
    exercise: {type: String, required:true},
    weight: {type: String},
    reps: {type: String},
    date: {type:Date, required:true},
    userid: {type: String, required:true}
});

mongoose.model('Workout', Workout);

module.exports = Workout;