"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Currency_1 = require("../core/Currency");
class ApplicationConfig {
    constructor() {
        this.sourceCoins = [Currency_1.Currency.BTC];
        this.targetCoins = [Currency_1.Currency.ETH, Currency_1.Currency.DSH, Currency_1.Currency.LTC];
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
            runEvery: '10' //seconds
        };
    }
}
exports.ApplicationConfig = ApplicationConfig;
exports.applicationConfig = new ApplicationConfig();
//# sourceMappingURL=ApplicationConfig.js.map