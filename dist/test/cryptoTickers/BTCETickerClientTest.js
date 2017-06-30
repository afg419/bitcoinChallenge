"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const BTCETickerClient_1 = require("../../main/cryptoTickers/BTCETickerClient");
const TestConfig_1 = require("../TestConfig");
const Currency_1 = require("../../main/core/Currency");
const util_1 = require("util");
var fetch = require('node-fetch');
describe('Gets and Normalizes CryptoExchanges', () => {
    let { btcE, sourceCoins, targetCoins } = TestConfig_1.testConfig;
    let underTest = new BTCETickerClient_1.BTCETickerClient(btcE.baseUrl, sourceCoins, targetCoins);
    it('should have correct keys', () => {
        let { exchangeKeys } = underTest;
        let keyNames = exchangeKeys.map(x => x.getKey()).sort();
        chai_1.expect(exchangeKeys.length).to.equal(underTest.sourceCurrencies.length * underTest.targetCurrencies.length);
        chai_1.expect(keyNames).to.eql(["ltc_btc", "eth_btc", "dsh_btc"].sort());
    });
    it('should append path of keys to url', () => {
        chai_1.expect(underTest.appendPathToUrl()).to.equal(underTest.apiUrl + "/eth_btc-dsh_btc-ltc_btc");
    });
    it('should process valid data', () => {
        let now = new Date();
        let response = underTest.normalizeResponse(now, sampleBtceResponse);
        chai_1.expect(response.length).to.equal(underTest.exchangeKeys.length);
        response.forEach(x => {
            chai_1.expect(x.date).to.eql(now);
            chai_1.expect(x.apiName).to.eql(underTest.apiName);
            chai_1.expect(x.valid()).to.eql(true);
        });
    });
    it('should ignore invalid data', () => {
        let now = new Date();
        let response = underTest.normalizeResponse(now, ethBtcMissingBuyResponse);
        chai_1.expect(response.length).to.equal(underTest.exchangeKeys.length - 1);
        response.forEach(x => {
            chai_1.expect(x.date).to.eql(now);
            chai_1.expect(x.apiName).to.eql(underTest.apiName);
            chai_1.expect(x.valid()).to.eql(true);
        });
        chai_1.expect(util_1.isNullOrUndefined(response.map(x => x.target).find(x => x == Currency_1.Currency.ETH)));
    });
});
let sampleBtceResponse = JSON.parse(`{"eth_btc":{"high":0.1206,"low":0.11381,"avg":0.117205,"vol":1136.08946,"vol_cur":9726.01176,"last":0.1149,"buy":0.11521,"sell":0.1149,"updated":1498852396},"ltc_btc":{"high":0.01638,"low":0.01567,"avg":0.016025,"vol":436.69558,"vol_cur":27255.36662,"last":0.01609,"buy":0.01614,"sell":0.01609,"updated":1498852396},"dsh_btc":{"high":0.0725,"low":0.06855,"avg":0.070525,"vol":177.70133,"vol_cur":2493.30514,"last":0.07204,"buy":0.07205,"sell":0.07194,"updated":1498852396}}`);
let ethBtcMissingBuyResponse = JSON.parse(`{"eth_btc":{"high":0.1206,"low":0.11381,"avg":0.117205,"vol":1136.08946,"vol_cur":9726.01176,"last":0.1149,"sell":0.1149,"updated":1498852396},"ltc_btc":{"high":0.01638,"low":0.01567,"avg":0.016025,"vol":436.69558,"vol_cur":27255.36662,"last":0.01609,"buy":0.01614,"sell":0.01609,"updated":1498852396},"dsh_btc":{"high":0.0725,"low":0.06855,"avg":0.070525,"vol":177.70133,"vol_cur":2493.30514,"last":0.07204,"buy":0.07205,"sell":0.07194,"updated":1498852396}}`);
//# sourceMappingURL=BTCETickerClientTest.js.map