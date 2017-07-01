"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient_1 = require("./db/clients/MongoClient");
const Runnr = require('node-runnr');
const CoinCapTickerClient_1 = require("./cryptoTickers/clients/CoinCapTickerClient");
const BTCETickerClient_1 = require("./cryptoTickers/clients/BTCETickerClient");
const PoloniexTickerClient_1 = require("./cryptoTickers/clients/PoloniexTickerClient");
const CryptoTickerWorker_1 = require("./cryptoTickers/CryptoTickerWorker");
let apiConfig = require("../../api/apiConfig");
var fetch = require('node-fetch');
fetch.Promise = require('bluebird');
const path = require('path');
const express = require("express");
let router = express.Router();
const ServerConfig_1 = require("./config/ServerConfig");
const ExchangeRatesController_1 = require("./controllers/ExchangeRatesController");
const ApplicationRouter_1 = require("./ApplicationRouter");
const cors = require('express-cors');
const bodyParser = require('body-parser');
const port = apiConfig.port; //(process.env.PORT || 3000);
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
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../../index.html'));
});
let mongoClient = new MongoClient_1.MongoDBClient();
let exchangeRatesController = new ExchangeRatesController_1.ExchangeRatesController(ServerConfig_1.serverConfig.defaultMinutesBackForExchangeRateQuery, mongoClient);
let appRouter = new ApplicationRouter_1.ApplicationRouter(router, apiConfig, exchangeRatesController);
app.use('/', appRouter.expressRouter);
app.get('/*', function (req, res) { res.sendFile(path.join(__dirname, '../../index.html')); });
app.listen(port, function () {
    mongoClient.initializeDb(port, db.mongo.url);
    if (ServerConfig_1.serverConfig.cryptoTickerJob.shouldRun) {
        console.log("NEW LOGGING");
        let cryptoTickerWorker = configureTickerWorker(ServerConfig_1.serverConfig, mongoClient);
        let runner = new Runnr();
        runner.interval(ServerConfig_1.serverConfig.cryptoTickerJob.jobName, ServerConfig_1.serverConfig.cryptoTickerJob.runEvery, {}).job(cryptoTickerWorker.run);
        runner.begin();
    }
});
function configureTickerWorker(applicationConfig, mongoClient) {
    let { poloniex, btcE, coinCap, sourceCoins, targetCoins } = applicationConfig;
    let poloniexClient = new PoloniexTickerClient_1.PoloniexTickerClient(poloniex.baseUrl, sourceCoins, targetCoins);
    let btceClient = new BTCETickerClient_1.BTCETickerClient(btcE.baseUrl, sourceCoins, targetCoins);
    let coinCapClient = new CoinCapTickerClient_1.CoinCapTickerClient(coinCap.baseUrl, sourceCoins, targetCoins);
    return new CryptoTickerWorker_1.CryptoTickerWorker([poloniexClient, btceClient, coinCapClient], mongoClient); //, btceClient, coinCapClient
}
console.log(`Listening at http://localhost:${port}`);
//# sourceMappingURL=app.js.map