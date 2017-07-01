import {Currency} from "../core/Currency";

export class ApplicationConfig {
    sourceCoins: Currency[] = [ Currency.BTC ];
    targetCoins: Currency[] = [ Currency.ETH, Currency.DSH, Currency.LTC ];

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
        runEvery: '10' //seconds
    };
}

export let applicationConfig = new ApplicationConfig();



