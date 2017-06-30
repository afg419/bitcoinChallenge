import { Job } from "./jobs/Job";
const Runnr = require('node-runnr');
import { CoinCapTickerClient } from "./cryptoTickers/CoinCapTickerClient";
import { BTCETickerClient } from "./cryptoTickers/BTCETickerClient";
import { PoloniexTickerClient } from "./cryptoTickers/PoloniexTickerClient";
import { CryptoTickerWorker, crypto } from "./cryptoTickers/CryptoTickerWorker";

const path = require('path');

import * as express from 'express';
import router = require("./router");

const cors = require('express-cors');
const bodyParser = require('body-parser')
const port = (process.env.PORT || 3000);
const app = express();
// import  from './router';
const db = require('./db/index');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../../webpack.config.js');
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
    mongoose.connection.on('error', function(err) {
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
    });
    mongoose.connect(db.mongo.url);

    let job1 = new Job('jobbo', '2', crypto.run);

    let poloniexApiUrl = "blahblah"
    let runner = new Runnr();


    let ourFunction: () => void = () => {
        fetch(poloniexApiUrl);
        let banana = 'banana'
    };

    runner.interval('get crypto tickers', '3', )


    startJobRunner([job1]);
});


function startJobRunner(jobs: Job[]){
    let runner = new Runnr();

    for( let job of jobs ){
        runner.interval(job.jobName, job.runEvery, {}).job( job.jobExecution )
    }

    runner.begin();
}

console.log(`Listening at http://localhost:${port}`);
