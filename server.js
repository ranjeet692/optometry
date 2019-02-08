var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
global.app = express();
global.app.use(cors());
global.app.use(bodyParser.json());
global.app.use(bodyParser.urlencoded({ extended: true }));
global.app.use('/',express.static(__dirname + "/public/"));
global.app.set('port', process.env.PORT || 9999);

var server = app.listen(app.get('port'), function(){
    console.log("Server started and listing at port number " + app.get('port'));
});