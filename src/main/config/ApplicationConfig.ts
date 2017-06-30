import {Currency} from "../core/Currency";

export class ApplicationConfig {
    sourceCoins: Currency[] = [ Currency.BTC ]
    targetCoins: Currency[] = [ Currency.ETH, Currency.DSH, Currency.LTC ]

    poloniex = {
        baseUrl: "https://poloniex.com/public?command=returnTicker" //filter
    };

    btcE = {
        baseUrl: "https://btc-e.com/api/3/ticker/eth_btc-ltc_btc-dsh_btc" //append
    };

    coinCap = {
        baseUrl: "http://www.coincap.io/front" //filter
    };

    cryptoTickerJob = {
        shouldRun: true,
        jobName: "get-crypto-ticker-dev",
        runEvery: '10' //seconds
    };
}

export let applicationConfig = new ApplicationConfig();



