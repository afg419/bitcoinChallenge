import {Currency} from "../../../api/Currency";

export class ServerConfig {
    sourceCoins: Currency[] = [ Currency.BTC ];
    targetCoins: Currency[] = [ Currency.ETH, Currency.DSH, Currency.LTC ];

    defaultMinutesBackForExchangeRateQuery = 60;

    poloniex = {
        baseUrl: "https://poloniex.com/public?command=returnTicker"
    };

    btcE = {
        baseUrl: "https://btc-e.com/api/3/ticker"
    };

    coinCap = {
        baseUrl: "http://www.coincap.io/front"
    };

    cryptoTickerJob = {
        shouldRun: true,
        jobName: "get-crypto-ticker-dev",
        runEvery: '15' //seconds
    };

    deleteOldTickerJob = {
        shouldRun: true,
        jobName: "delete-crypto-ticker-dev",
        runEvery: '3600', //seconds, 1 hour
        deleteOlderThan: 3600
    };
}

export let serverConfig = new ServerConfig();



