"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Runnr = require('node-runnr');
const CoinCapTickerClient_1 = require("./cryptoTickers/CoinCapTickerClient");
const BTCETickerClient_1 = require("./cryptoTickers/BTCETickerClient");
const PoloniexTickerClient_1 = require("./cryptoTickers/PoloniexTickerClient");
const CryptoTickerWorker_1 = require("./cryptoTickers/CryptoTickerWorker");
var fetch = require('node-fetch');
fetch.Promise = require('bluebird');
const path = require('path');
const express = require("express");
const router = require("./router");
const ApplicationConfig_1 = require("./config/ApplicationConfig");
const cors = require('express-cors');
const bodyParser = require('body-parser');
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
        console.log(`ready to accept connections on port ${port}`);
    });
    mongoose.connect(db.mongo.url);
    if (ApplicationConfig_1.applicationConfig.cryptoTickerJob.shouldRun) {
        console.log("NEW LOGGING");
        let cryptoTickerWorker = configureTickerWorker(ApplicationConfig_1.applicationConfig);
        let runner = new Runnr();
        runner.interval(ApplicationConfig_1.applicationConfig.cryptoTickerJob.jobName, ApplicationConfig_1.applicationConfig.cryptoTickerJob.runEvery, {}).job(cryptoTickerWorker.run);
        runner.begin();
    }
});
function configureTickerWorker(applicationConfig) {
    let { poloniex, btcE, coinCap, sourceCoins, targetCoins } = applicationConfig;
    let poloniexClient = new PoloniexTickerClient_1.PoloniexTickerClient(poloniex.baseUrl, sourceCoins, targetCoins);
    let btceClient = new BTCETickerClient_1.BTCETickerClient(btcE.baseUrl, sourceCoins, targetCoins);
    let coinCapClient = new CoinCapTickerClient_1.CoinCapTickerClient(coinCap.baseUrl, sourceCoins, targetCoins);
    return new CryptoTickerWorker_1.CryptoTickerWorker([poloniexClient, btceClient, coinCapClient]); //, btceClient, coinCapClient
}
console.log(`Listening at http://localhost:${port}`);
//# sourceMappingURL=app.js.map