import {Currency} from "../core/Currency";

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
        runEvery: '60' //seconds
    };
}

export let serverConfig = new ServerConfig();



