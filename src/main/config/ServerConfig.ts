import {Currency} from "../../../api/Currency";

export class ServerConfig {
    sourceCoins: Currency[] = [ Currency.BTC ];
    targetCoins: Currency[] = [ Currency.ETH, Currency.DSH, Currency.LTC ];

    defaultMinutesBackForExchangeRateQuery = 1440 * 3;

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
        shouldRun: false,
        jobName: "get-crypto-ticker-dev",
        runEvery: '60' //seconds
    };

    deleteOldTickerJob = {
        shouldRun: false,
        jobName: "delete-crypto-ticker-dev",
        runEvery: '3600', //seconds, 1 hour
        deleteOlderThan: 3600
    };
}

export let serverConfig = new ServerConfig();



