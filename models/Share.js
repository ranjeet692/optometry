var mongoose = require('mongoose');

const Share = new mongoose.Schema({
    id: {type: String, unique:true, required:true, index:true},
    userid: {type: String, required:true},
    username: {type: String},
    date: {type:Date},
});

mongoose.model('Share', Share);

module.exports = Share;