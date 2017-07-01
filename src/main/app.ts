import { MongoDBClient } from "./db/clients/MongoClient";
const Runnr = require('node-runnr');
import { CoinCapTickerClient } from "./cryptoTickers/clients/CoinCapTickerClient";
import { BTCETickerClient } from "./cryptoTickers/clients/BTCETickerClient";
import { PoloniexTickerClient } from "./cryptoTickers/clients/PoloniexTickerClient";
import { CryptoTickerWorker } from "./cryptoTickers/CryptoTickerWorker";

let apiConfig = require("../../api/apiConfig")

var fetch = require('node-fetch');
fetch.Promise = require('bluebird')
const path = require('path');
import * as express from 'express';
let router: Router = express.Router();
import { serverConfig, ServerConfig } from "./config/ServerConfig";
import {DBClient} from "./db/clients/DBClient";
import {ExchangeRatesController} from "./controllers/ExchangeRatesController";
import {Router} from "express";
import {ApplicationRouter} from "./ApplicationRouter";
import {DeleteTickerWorker} from "./cryptoTickers/DeleteTickerWorker";

const cors = require('express-cors');
const bodyParser = require('body-parser')
const port = apiConfig.port //(process.env.PORT || 3000);
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
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../../index.html'))
});

let mongoClient = new MongoDBClient();

let exchangeRatesController: ExchangeRatesController = new ExchangeRatesController(
    serverConfig.defaultMinutesBackForExchangeRateQuery, mongoClient
);

let appRouter = new ApplicationRouter(router, apiConfig, exchangeRatesController);


app.use('/', appRouter.expressRouter);
app.get('/*', function (req, res) { res.sendFile(path.join(__dirname, '../../index.html')) });


app.listen(port, function () {
    mongoClient.initializeDb(port, db.mongo.url);

    if(serverConfig.cryptoTickerJob.shouldRun){
        let cryptoTickerWorker = configureTickerWorker(serverConfig, mongoClient);
        let deleteTickerWorker = configureDeleteTickerWorker(serverConfig, mongoClient);

        let runner = new Runnr();
        runner.interval(serverConfig.cryptoTickerJob.jobName, serverConfig.cryptoTickerJob.runEvery, {}).job(cryptoTickerWorker.run);
        runner.interval(serverConfig.deleteOldTickerJob.jobName, serverConfig.deleteOldTickerJob.runEvery, {}).job(deleteTickerWorker.run);

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