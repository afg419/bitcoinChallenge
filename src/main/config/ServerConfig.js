"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Currency_1 = require("../../../api/Currency");
class ServerConfig {
    constructor() {
        this.sourceCoins = [Currency_1.Currency.BTC];
        this.targetCoins = [Currency_1.Currency.ETH, Currency_1.Currency.DSH, Currency_1.Currency.LTC];
        this.defaultMinutesBackForExchangeRateQuery = 60;
        this.poloniex = {
            baseUrl: "https://poloniex.com/public?command=returnTicker"
        };
        this.btcE = {
            baseUrl: "https://btc-e.com/api/3/ticker"
        };
        this.coinCap = {
            baseUrl: "http://www.coincap.io/front"
        };
        this.cryptoTickerJob = {
            shouldRun: true,
            jobName: "get-crypto-ticker-dev",
            runEvery: '60' //seconds
        };
        this.deleteOldTickerJob = {
            shouldRun: true,
            jobName: "delete-crypto-ticker-dev",
            runEvery: '3600',
            deleteOlderThan: 3600
        };
    }
}
exports.ServerConfig = ServerConfig;
exports.serverConfig = new ServerConfig();
//# sourceMappingURL=ServerConfig.js.map