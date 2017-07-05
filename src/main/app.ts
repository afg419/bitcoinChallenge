


import { MongoDBClient } from "./db/clients/MongoDBClient";
import { CoinCapTickerClient } from "./apiClients/CoinCapTickerClient";
import { BTCETickerClient } from "./apiClients/BTCETickerClient";
import { PoloniexTickerClient } from "./apiClients/PoloniexTickerClient";
import { CryptoTickerWorker } from "./jobs/CryptoTickerWorker";
import { serverConfig, ServerConfig } from "./config/ServerConfig";
import {DBClient} from "./db/clients/DBClient";
import {ExchangeRatesController} from "./controllers/ExchangeRatesController";
import {Router} from "express";
import {ApplicationRouter} from "./ApplicationRouter";
import {DeleteTickerWorker} from "./jobs/DeleteTickerWorker";
let apiConfig = require("../../api/apiConfig");
// let bitcoin = require('bitcoin');
const port = apiConfig.port;

const Runnr = require('node-runnr');
const fetch = require('node-fetch');
const cors = require('express-cors');
const bodyParser = require('body-parser');
fetch.Promise = require('bluebird');
const path = require('path');
import * as express from 'express';
import {bitcoinConfig} from "./config/BitcoinConfig";
import {BitcoinClient} from "./bitcoind/BitcoinClient";
let router: Router = express.Router();

const db = require('./db/index');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use('/assets', express.static(path.join(__dirname, '../app/assets')));

let mongoClient: MongoDBClient = new MongoDBClient();
let bitcoinClient: BitcoinClient = new BitcoinClient(serverConfig.coinbase );


let exchangeRatesController: ExchangeRatesController = new ExchangeRatesController(
    serverConfig.defaultMinutesBackForExchangeRateQuery, mongoClient
);

let appRouter = new ApplicationRouter(router, apiConfig, exchangeRatesController);

app.use('/', appRouter.expressRouter);

app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../../index.html'))
});
app.get('/*', function (req, res) { res.sendFile(path.join(__dirname, '../../index.html')) });


app.listen(port, function () {
    mongoClient.initializeDb(port, db.mongo.url);
    let runner = new Runnr();

    if(serverConfig.deleteOldTickerJob.shouldRun){
        let deleteTickerWorker = configureDeleteTickerWorker(serverConfig, mongoClient);
        runner.interval(serverConfig.deleteOldTickerJob.jobName, serverConfig.deleteOldTickerJob.runEvery, {}).job(deleteTickerWorker.run);
    }

    if(serverConfig.cryptoTickerJob.shouldRun){
        let cryptoTickerWorker = configureTickerWorker(serverConfig, mongoClient);
        runner.interval(serverConfig.cryptoTickerJob.jobName, serverConfig.cryptoTickerJob.runEvery, {}).job(cryptoTickerWorker.run);
    }

    if(serverConfig.deleteOldTickerJob.shouldRun || serverConfig.cryptoTickerJob.shouldRun){
        runner.begin();
    }
});

function configureTickerWorker(applicationConfig: ServerConfig, mongoClient: DBClient): CryptoTickerWorker {
    let {poloniex, btcE, coinCap, sourceCoins, targetCoins} = applicationConfig;

    let poloniexClient: PoloniexTickerClient = new PoloniexTickerClient(poloniex.baseUrl, sourceCoins, targetCoins);
    let btceClient: BTCETickerClient = new BTCETickerClient(btcE.baseUrl, sourceCoins, targetCoins);
    let coinCapClient: CoinCapTickerClient = new CoinCapTickerClient(coinCap.baseUrl, sourceCoins, targetCoins);

    return new CryptoTickerWorker([poloniexClient, btceClient, coinCapClient], mongoClient); //, btceClient, coinCapClient
}

function configureDeleteTickerWorker(applicationConfig: ServerConfig, mongoClient: DBClient): DeleteTickerWorker {
    return new DeleteTickerWorker(serverConfig.deleteOldTickerJob.deleteOlderThan, mongoClient); //, btceClient, coinCapClient
}


console.log(`Listening at http://localhost:${port}`);