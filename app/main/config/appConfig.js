"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Currency_1 = require("../../../api/Currency");
module.exports = {
    sourceCoins: [Currency_1.Currency.BTC],
    targetCoins: [Currency_1.Currency.ETH, Currency_1.Currency.DSH, Currency_1.Currency.LTC],
    apiNames: ["Poloniex", "BTC-e", "CoinCap"],
    minutesBackForExchangeRateGraphs: 60,
    pollServerForExchangeRatesJob: {
        shouldRun: true,
        runEvery: 10 //seconds
    }
};
//# sourceMappingURL=appConfig.js.map