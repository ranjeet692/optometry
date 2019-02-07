var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
    userid: { type: String, unique:true, required:true, index:true },
    name: { type: String, required:true, match: /[a-z]/},
    dob: { type: Date },
    gender: { type: String },
    password: { type: String },
    hash: {type: String },
    salt: {type: String }
});

User.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

User.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

User.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      userid: this.userid,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

User.plugin(passportLocalMongoose);

mongoose.model('User', User);

module.exports = User;