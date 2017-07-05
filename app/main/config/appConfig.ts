import {Currency} from "../../../api/Currency";
module.exports = {
    sourceCoins: [ Currency.BTC ],
    targetCoins: [ Currency.ETH, Currency.DSH, Currency.LTC ],

    apiNames: ["Poloniex", "BTC-e", "CoinCap"],

    minutesBackForExchangeRateGraphs: 60,

    pollServerForExchangeRatesJob: {
        shouldRun: true,
        runEvery: 10 //seconds
    }
};


