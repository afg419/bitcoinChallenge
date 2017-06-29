"use strict";
exports.__esModule = true;
var Job_1 = require("./jobs/Job");
var JobRunner_1 = require("./jobs/JobRunner");
var path = require('path');
var express = require('express');
var cors = require('express-cors');
var bodyParser = require('body-parser');
var port = (process.env.PORT || 3000);
var app = express();
var router = require('./router');
var db = require('./db/index');
var mongoose = require('mongoose');
var Agenda = require('agenda');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var config = require('../webpack.config.js');
    var compiler = webpack(config);
    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
}
app.use('/assets', express.static(path.join(__dirname, '../app/assets')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../index.html'));
});
app.use('/', router);
app.get('/*', function (req, res) { res.sendFile(path.join(__dirname, '/../index.html')); });
app.listen(port, function () {
    //init db
    mongoose.connection.on('error', function (err) {
        console.error('Mongoose default connection error: ' + err);
        process.exit(1);
    });
    mongoose.connection.on('open', function (err) {
        if (err) {
            console.error(err);
            // log.error('Mongoose default connection error: ' + err);
            process.exit(1);
        }
        console.log("ready to accept connections on port " + port);
        // log.info(
        //     '%s v%s ready to accept connections on port %s in %s environment.',
        //     server.name,
        //     config.version,
        //     config.port,
        //     config.env
        // );
        // serve up routes to client
        // require('./routes');
    });
    mongoose.connect(db.mongo.url);
    var agenda = new Agenda({ db: { address: db.mongo.url } });
    var job1 = new Job_1.Job('whoot-job', '5 second', function (job, done) { console.log("whoot"); done(); });
    var job2 = new Job_1.Job('weep-job', '10 second', function (job, done) { console.log("weep"); done(); });
    var runner = new JobRunner_1.JobRunner([job1, job2], agenda);
    agenda.on('ready', function () {
        runner.start();
    });
});
console.log("Listening at http://localhost:" + port);
