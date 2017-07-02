import { expect } from 'chai';
import {BTCETickerClient} from "../../main/cryptoTickers/BTCETickerClient";
import { testConfig } from "../TestConfig"
import {Currency} from "../../../api/Currency";
import {isNullOrUndefined} from "util";
var fetch = require('node-fetch');



describe('Gets and Normalizes CryptoExchanges', () => {
    let {btcE, sourceCoins, targetCoins} = testConfig;

    let underTest = new BTCETickerClient(btcE.baseUrl, sourceCoins, targetCoins);

    it('should have correct keys', () => {
        let { exchangeKeys } = underTest;
        let keyNames = exchangeKeys.map(x => x.getKey()).sort();
        expect(exchangeKeys.length).to.equal(underTest.sourceCurrencies.length * underTest.targetCurrencies.length)
        expect(keyNames).to.eql(["ltc_btc", "eth_btc", "dsh_btc"].sort())
    });

    it('should append path of keys to url', () => {
        expect(underTest.appendPathToUrl()).to.equal(underTest.apiUrl+ "/eth_btc-dsh_btc-ltc_btc")
    });

    it('should process valid data', () => {
        let now = new Date();
        let response = underTest.normalizeResponse(now, sampleBtceResponse);
        expect(response.length).to.equal(underTest.exchangeKeys.length);
        response.forEach(x => {
            expect(x.date).to.eql(now);
            expect(x.apiName).to.eql(underTest.apiName);
            expect(x.valid()).to.eql(true);
        })
    });

    it('should ignore invalid data', () => {
        let now = new Date();
        let response = underTest.normalizeResponse(now, ethBtcMissingBuyResponse);
        expect(response.length).to.equal(underTest.exchangeKeys.length - 1);
        response.forEach(x => {
            expect(x.date).to.eql(now);
            expect(x.apiName).to.eql(underTest.apiName);
            expect(x.valid()).to.eql(true);
        });
        expect(isNullOrUndefined(response.map(x => x.target).find(x => x == Currency.ETH)))
    });
});

let sampleBtceResponse = JSON.parse(`{"eth_btc":{"high":0.1206,"low":0.11381,"avg":0.117205,"vol":1136.08946,"vol_cur":9726.01176,"last":0.1149,"buy":0.11521,"sell":0.1149,"updated":1498852396},"ltc_btc":{"high":0.01638,"low":0.01567,"avg":0.016025,"vol":436.69558,"vol_cur":27255.36662,"last":0.01609,"buy":0.01614,"sell":0.01609,"updated":1498852396},"dsh_btc":{"high":0.0725,"low":0.06855,"avg":0.070525,"vol":177.70133,"vol_cur":2493.30514,"last":0.07204,"buy":0.07205,"sell":0.07194,"updated":1498852396}}`)
let ethBtcMissingBuyResponse = JSON.parse(`{"eth_btc":{"high":0.1206,"low":0.11381,"avg":0.117205,"vol":1136.08946,"vol_cur":9726.01176,"last":0.1149,"sell":0.1149,"updated":1498852396},"ltc_btc":{"high":0.01638,"low":0.01567,"avg":0.016025,"vol":436.69558,"vol_cur":27255.36662,"last":0.01609,"buy":0.01614,"sell":0.01609,"updated":1498852396},"dsh_btc":{"high":0.0725,"low":0.06855,"avg":0.070525,"vol":177.70133,"vol_cur":2493.30514,"last":0.07204,"buy":0.07205,"sell":0.07194,"updated":1498852396}}`)