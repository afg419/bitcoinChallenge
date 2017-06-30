const Runnr = require('node-runnr');
import { CoinCapTickerClient } from "./cryptoTickers/CoinCapTickerClient";
import { BTCETickerClient } from "./cryptoTickers/BTCETickerClient";
import { PoloniexTickerClient } from "./cryptoTickers/PoloniexTickerClient";
import { CryptoTickerWorker } from "./cryptoTickers/CryptoTickerWorker";
var fetch = require('node-fetch');
fetch.Promise = require('bluebird')

const path = require('path');

import * as express from 'express';
import router = require("./router");
import { applicationConfig, ApplicationConfig } from "./config/ApplicationConfig";

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

    if(applicationConfig.cryptoTickerJob.shouldRun){
        let cryptoTickerWorker = configureTickerWorker(applicationConfig);
        let runner = new Runnr();
        runner.interval(applicationConfig.cryptoTickerJob.jobName, applicationConfig.cryptoTickerJob.runEvery, {}).job(cryptoTickerWorker.run);
        runner.begin();
    }
});


function configureTickerWorker(applicationConfig: ApplicationConfig): CryptoTickerWorker {
    let {poloniex, btcE, coinCap, sourceCoins, targetCoins} = applicationConfig;

    let poloniexClient: PoloniexTickerClient = new PoloniexTickerClient(poloniex.baseUrl, sourceCoins, targetCoins);
    let btceClient: BTCETickerClient = new BTCETickerClient(btcE.baseUrl, sourceCoins, targetCoins);
    let coinCapClient: CoinCapTickerClient = new CoinCapTickerClient(coinCap.baseUrl, sourceCoins, targetCoins);

    return new CryptoTickerWorker([poloniexClient]); //, btceClient, coinCapClient
}

console.log(`Listening at http://localhost:${port}`);