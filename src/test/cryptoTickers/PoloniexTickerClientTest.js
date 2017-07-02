"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const PoloniexTickerClient_1 = require("../../main/cryptoTickers/PoloniexTickerClient");
const TestConfig_1 = require("../TestConfig");
const Currency_1 = require("../../../api/Currency");
const util_1 = require("util");
var fetch = require('node-fetch');
describe('Gets and Normalizes CryptoExchanges', () => {
    let { poloniex, sourceCoins, targetCoins } = TestConfig_1.testConfig;
    let underTest = new PoloniexTickerClient_1.PoloniexTickerClient(poloniex.baseUrl, sourceCoins, targetCoins);
    it('should not customize url', () => {
        chai_1.expect(underTest.appendPathToUrl()).to.equal(underTest.apiUrl);
    });
    it('should have correct keys', () => {
        let { exchangeKeys } = underTest;
        let keyNames = exchangeKeys.map(x => x.getKey()).sort();
        chai_1.expect(exchangeKeys.length).to.equal(underTest.sourceCurrencies.length * underTest.targetCurrencies.length);
        chai_1.expect(keyNames).to.eql(["BTC_LTC", "BTC_ETH", "BTC_DASH"].sort());
    });
    it('should process valid data', () => {
        let now = new Date();
        let response = underTest.normalizeResponse(now, samplePoloniexResponse);
        chai_1.expect(response.length).to.equal(underTest.exchangeKeys.length);
        response.forEach(x => {
            chai_1.expect(x.date).to.eql(now);
            chai_1.expect(x.apiName).to.eql(underTest.apiName);
            chai_1.expect(x.valid()).to.eql(true);
        });
    });
    it('should ignore invalid data', () => {
        let now = new Date();
        let response = underTest.normalizeResponse(now, ltcBtcMissingAskResponse);
        chai_1.expect(response.length).to.equal(underTest.exchangeKeys.length - 1);
        response.forEach(x => {
            chai_1.expect(x.date).to.eql(now);
            chai_1.expect(x.apiName).to.eql(underTest.apiName);
            chai_1.expect(x.valid()).to.eql(true);
        });
        chai_1.expect(util_1.isNullOrUndefined(response.map(x => x.target).find(x => x == Currency_1.Currency.LTC)));
    });
});
let samplePoloniexResponse = JSON.parse(`{
    "BTC_BTM": {
        "id": 13,
        "last": "0.00039653",
        "lowestAsk": "0.00039994",
        "highestBid": "0.00039652",
        "percentChange": "-0.06795317",
        "baseVolume": "59.18741415",
        "quoteVolume": "141002.50672027",
        "isFrozen": "0",
        "high24hr": "0.00045505",
        "low24hr": "0.00039652"
    },
    "BTC_LTC": {
        "id": 50,
        "last": "0.01596797",
        "lowestAsk": "0.01599875",
        "highestBid": "0.01596797",
        "percentChange": "-0.01995808",
        "baseVolume": "3560.06197833",
        "quoteVolume": "223339.35950561",
        "isFrozen": "0",
        "high24hr": "0.01633060",
        "low24hr": "0.01563000"
    },
    "BTC_MAID": {
        "id": 51,
        "last": "0.00018780",
        "lowestAsk": "0.00018790",
        "highestBid": "0.00018780",
        "percentChange": "-0.04041694",
        "baseVolume": "352.62873231",
        "quoteVolume": "1859283.33297164",
        "isFrozen": "0",
        "high24hr": "0.00019622",
        "low24hr": "0.00018539"
    },
    "BTC_DASH": {
        "id": 24,
        "last": "0.07150069",
        "lowestAsk": "0.07150069",
        "highestBid": "0.07143798",
        "percentChange": "0.00267395",
        "baseVolume": "1649.67060726",
        "quoteVolume": "23357.42836352",
        "isFrozen": "0",
        "high24hr": "0.07199998",
        "low24hr": "0.06879168"
    },
    "BTC_DOGE": {
        "id": 27,
        "last": "0.00000101",
        "lowestAsk": "0.00000101",
        "highestBid": "0.00000100",
        "percentChange": "-0.03809523",
        "baseVolume": "808.87685914",
        "quoteVolume": "793742430.66673625",
        "isFrozen": "0",
        "high24hr": "0.00000106",
        "low24hr": "0.00000099"
    },
    "BTC_ETH": {
        "id": 148,
        "last": "0.11606089",
        "lowestAsk": "0.11606089",
        "highestBid": "0.11599422",
        "percentChange": "-0.06883111",
        "baseVolume": "50405.05013880",
        "quoteVolume": "427489.15671165",
        "isFrozen": "0",
        "high24hr": "0.12514001",
        "low24hr": "0.11354683"
    }
}`);
let ltcBtcMissingAskResponse = JSON.parse(`{
    "BTC_BTM": {
        "id": 13,
        "last": "0.00039653",
        "lowestAsk": "0.00039994",
        "highestBid": "0.00039652",
        "percentChange": "-0.06795317",
        "baseVolume": "59.18741415",
        "quoteVolume": "141002.50672027",
        "isFrozen": "0",
        "high24hr": "0.00045505",
        "low24hr": "0.00039652"
    },
    "BTC_LTC": {
        "id": 50,
        "last": "0.01596797",
        "lowestAsk": "0.01599875",
        "percentChange": "-0.01995808",
        "baseVolume": "3560.06197833",
        "quoteVolume": "223339.35950561",
        "isFrozen": "0",
        "high24hr": "0.01633060",
        "low24hr": "0.01563000"
    },
    "BTC_MAID": {
        "id": 51,
        "last": "0.00018780",
        "lowestAsk": "0.00018790",
        "highestBid": "0.00018780",
        "percentChange": "-0.04041694",
        "baseVolume": "352.62873231",
        "quoteVolume": "1859283.33297164",
        "isFrozen": "0",
        "high24hr": "0.00019622",
        "low24hr": "0.00018539"
    },
    "BTC_DASH": {
        "id": 24,
        "last": "0.07150069",
        "lowestAsk": "0.07150069",
        "highestBid": "0.07143798",
        "percentChange": "0.00267395",
        "baseVolume": "1649.67060726",
        "quoteVolume": "23357.42836352",
        "isFrozen": "0",
        "high24hr": "0.07199998",
        "low24hr": "0.06879168"
    },
    "BTC_DOGE": {
        "id": 27,
        "last": "0.00000101",
        "lowestAsk": "0.00000101",
        "highestBid": "0.00000100",
        "percentChange": "-0.03809523",
        "baseVolume": "808.87685914",
        "quoteVolume": "793742430.66673625",
        "isFrozen": "0",
        "high24hr": "0.00000106",
        "low24hr": "0.00000099"
    },
    "BTC_ETH": {
        "id": 148,
        "last": "0.11606089",
        "lowestAsk": "0.11606089",
        "highestBid": "0.11599422",
        "percentChange": "-0.06883111",
        "baseVolume": "50405.05013880",
        "quoteVolume": "427489.15671165",
        "isFrozen": "0",
        "high24hr": "0.12514001",
        "low24hr": "0.11354683"
    }
}`);
//# sourceMappingURL=PoloniexTickerClientTest.js.map