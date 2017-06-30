import { expect } from 'chai';
import { CoinCapTickerClient } from "../../main/cryptoTickers/CoinCapTickerClient";
import { testConfig } from "../TestConfig"
import {Currency} from "../../main/core/Currency";
import {isNullOrUndefined} from "util";
var fetch = require('node-fetch');

describe('Gets and Normalizes CryptoExchanges', () => {
    let {coinCap, sourceCoins, targetCoins} = testConfig;

    let underTest = new CoinCapTickerClient(coinCap.baseUrl, sourceCoins, targetCoins);

    it('should leave url untouched', () => {
        expect(underTest.appendPathToUrl()).to.equal(underTest.apiUrl)
    });

    it('should process valid data', () => {
        let now = new Date();
        let response = underTest.normalizeResponse(now, sampleBtceResponse);
        expect(response.length).to.equal(sourceCoins.length * targetCoins.length);
        response.forEach(x => {
            expect(x.date).to.eql(now);
            expect(x.apiName).to.eql(underTest.apiName);
            expect(x.valid()).to.eql(true);
        })
    });
    //
    // it('should ignore invalid data', () => {
    //     let now = new Date();
    //     let response = underTest.normalizeResponse(now, ethBtcMissingBuyResponse);
    //     expect(response.length).to.equal(underTest.exchangeKeys.length - 1);
    //     response.forEach(x => {
    //         expect(x.date).to.eql(now);
    //         expect(x.apiName).to.eql(underTest.apiName);
    //         x.valid()
    //     });
    //     expect(isNullOrUndefined(response.map(x => x.target).find(x => x == Currency.ETH)))
    // });
});

let sampleBtceResponse = JSON.parse(`[
    {
        "shapeshift": true,
        "position24": "1",
        "position": "1",
        "short": "BTC",
        "long": "Bitcoin",
        "time": 1498855438507,
        "price": "2528.07",
        "perc": "-1.72",
        "volume": "825837000",
        "usdVolume": "825837000",
        "cap24hrChange": "-1.72",
        "mktcap": "41509612500.1",
        "supply": "16419487",
        "published": false,
        "vwapData": "2530.4235832390937"
    },
    {
        "published": false,
        "time": 1498855440190,
        "short": "ETH",
        "position24": "2",
        "long": "Ethereum",
        "delta": "-0.02484913",
        "perc": "-0.02484913",
        "supply": "92920036",
        "price": 289.3123813614,
        "volume": "963173000",
        "usdVolume": "963173000",
        "cap24hrChange": "-4.45",
        "mktcap": 26882916891.34702,
        "cap24hrChangePercent": "-4.45",
        "capPercent": "-4.45",
        "vwapData": "301.3635324817905",
        "vwapDataBTC": 0.11920695727641659,
        "shapeshift": true
    },
     {
        "shapeshift": true,
        "position24": "7",
        "position": "7",
        "short": "DASH",
        "long": "Dash",
        "time": 1498855438507,
        "price": "182.498",
        "perc": "2.90",
        "volume": "48706300",
        "usdVolume": "48706300",
        "cap24hrChange": "2.90",
        "mktcap": "1349414600.82",
        "supply": "7394134",
        "published": false,
        "vwapData": "179.134903563707"
    },
      {
        "shapeshift": true,
        "position24": "4",
        "position": "4",
        "short": "LTC",
        "long": "Litecoin",
        "time": 1498855438507,
        "price": "41.0665",
        "perc": "-1.69",
        "volume": "240539000",
        "usdVolume": "240539000",
        "cap24hrChange": "-1.69",
        "mktcap": "2126604365.34",
        "supply": "51784407",
        "published": false,
        "vwapData": "40.60982330512282"
    },
    {
        "published": false,
        "time": 1498855440190,
        "short": "XRP",
        "position24": "3",
        "long": "Ripple",
        "delta": "0.00486255",
        "perc": "0.00486255",
        "supply": "38291387790",
        "price": 0.25599236820000004,
        "volume": "68897700",
        "usdVolume": "68897700",
        "cap24hrChange": "-0.47",
        "mktcap": 9802303042.026667,
        "cap24hrChangePercent": "-0.47",
        "capPercent": "-0.47",
        "vwapData": "0.25713264877508346",
        "vwapDataBTC": 0.00010171104786460954,
        "shapeshift": true
    },
    {
        "shapeshift": true,
        "position24": "5",
        "position": "5",
        "short": "ETC",
        "long": "Ethereum Classic",
        "time": 1498855438507,
        "price": "19.1672",
        "perc": "0.82",
        "volume": "120397000",
        "usdVolume": "120397000",
        "cap24hrChange": "0.82",
        "mktcap": "1784634876.36",
        "supply": "93108794",
        "published": false,
        "vwapData": "18.157962159832675"
    }
]`);