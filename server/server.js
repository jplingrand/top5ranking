var http = require("http");
var logger = require(__dirname +'/core-tools/logger');
var express = require("express")
var app = express();
var path = require('path');

var server = http.createServer(app)
var port = process.env.PORT || 5000

global.paths = {
	core_tools:__dirname +'/core-tools/'
}

app.use('/',require(__dirname+'/routes'));

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '../client/views')); 

app.set('view engine', 'html');

var db = require(global.paths.core_tools+'/dataModel')

db.sequelize.sync().then(function() {

	var server = app.listen(port, function() {
		logger.info("Server started and listening on port " + port);
	});

})

