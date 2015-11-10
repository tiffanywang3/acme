'use strict';
var chalk = require('chalk');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var startDB = require('./db/index.js')

// Parse our POST and PUT bodies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {
    res.send('Hello World!');
});

app.use(function (req, res, next) {
    console.log('BEFORE WRITEHEAD')
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    //res.setHeader("Content-Type", undefined);

    //res.writeHead(200, {
    //    "Access-Control-Allow-Origin": "*",
    //    "Access-Control-Allow-Methods": "*"
    //})
    console.log('blah')
    next();
});

app.use('/api', require('./routes'));


// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
 var startDb = require('./db');

// Create a node server instance! cOoL!
var server = require('http').createServer();

var createApplication = function () {
    server.on('request', app); // Attach the Express application.
};

var startServer = function () {

    var PORT = process.env.PORT || 3000;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

startDb.then(createApplication).then(startServer).catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});



