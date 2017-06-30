import { expect } from 'chai';
import { CoinCapTickerClient } from "../../main/cryptoTickers/CoinCapTickerClient";
import {BTCETickerClient} from "../../main/cryptoTickers/BTCETickerClient";
import { testConfig } from "../TestConfig"
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
});