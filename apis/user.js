var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function () {
    global.app.post('/user/login', function (req, res) {
        passport.authenticate('local', function(err, user, info){
            var token;
            // If Passport throws/catches an error
            if (err) {
                res.status(404).json(err);
                return;
            }
            // If a user is found
            if(user){
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token" : token,
                    "userid": user._doc.userid,
                    "username": user._doc.name
                });
            } else {
                // If user is not found
                res.status(401).json(info);
            }
        })(req, res);
    });

    global.app.post('/user/register', function (req, res) {
        var user = new User();
        user.userid = req.body.userId;
        user.name = req.body.name;
        user.password = req.body.password;
        //user.setPassword(req.body.password);
        user.save(function(err) {
            if (err) {
                res.status(500);
                res.json(err);
            }else {
                var token;
                token = user.generateJwt();
                res.status(200);
                res.json({
                "token" : token
                });
            }
        });
    });

    global.app.post('/user/profile/update', function (req, res) {
        var id = req.body.userid;
        var name = req.body.name;
        var dob = req.body.dob;
        var gender = req.body.gender;
        //user.setPassword(req.body.password);
        User.findOneAndUpdate( {"userid": id}, {name: name, dob: dob, gender: gender}, function(err) {
            if (err) {
                res.status(500);
                res.json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Profile updated successfully"
                });
            }
        });
    });

    global.app.get('/user/profile/:userid', function (req, res) {
        if (!req.params.userid) {
            res.status(401).json({
                "message" : "UnauthorizedError: private profile"
            });
        } else {
            User
                .findOne({userid: req.params.userid})
                .exec(function(err, user) {
                    if (user && user._doc) {
                        delete user._doc.password;
                    }
                    res.status(200).json(user);
                });
        }
    });
};