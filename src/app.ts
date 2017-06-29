
import {Job} from "./jobs/Job";
import {JobRunner} from "./jobs/JobRunner";
const path = require('path');
const express = require('express');
const cors = require('express-cors');
const bodyParser = require('body-parser')
const port = (process.env.PORT || 3000);
const app = express();
const router = require('./router');
const db = require('./db/index');
const mongoose = require('mongoose');
const Agenda = require('agenda');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.config.js');
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
}


app.use('/assets', express.static(path.join(__dirname, '../app/assets')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../index.html'))
});

app.use('/', router);
app.get('/*', function (req, res) { res.sendFile(path.join(__dirname, '/../index.html')) });

app.listen(port, function () {
    //init db
    mongoose.connection.on('error',function (err) {
        console.error('Mongoose default connection error: ' + err);
        process.exit(1);
    });

    mongoose.connection.on('open', function(err) {
        if (err) {
            console.error(err)
            // log.error('Mongoose default connection error: ' + err);
            process.exit(1);
        }

        console.log(`ready to accept connections on port ${port}`);
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

    let agenda = new Agenda({db: {address: db.mongo.url}});

    let job1: Job = new Job('whoot-job', '5 second', (job, done) => { console.log("whoot"); done(); });
    let job2: Job = new Job('weep-job', '10 second', (job, done) => { console.log("weep"); done(); });
    let runner: JobRunner = new JobRunner([job1, job2], agenda)

    agenda.on('ready', function() {
        runner.start()
    });
});

console.log(`Listening at http://localhost:${port}`);
