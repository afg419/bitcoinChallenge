import { expect } from 'chai';
import {BTCETickerClient} from "../../main/apiClients/BTCETickerClient";
import { testConfig } from "../TestConfig"
import {Currency} from "../../../api/Currency";
import {isNullOrUndefined} from "util";
import {CryptoExchangeRate} from "../../main/models/CryptoExchangeRate";
var fetch = require('node-fetch');



describe('validates appropriately', () => {
    let sourceCurrency = Currency.BTC;
    let targetCurrency = Currency.ETH;


    it('should be valid with valid info', () => {
       let validExchangeRate = new CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, 0.11, "someApi");
       expect(validExchangeRate.valid()).to.eq(true);
    });

    it('should be invalid with any undefined data', () => {
        let invalids: CryptoExchangeRate[] = [];
        invalids[0] = new CryptoExchangeRate(undefined, sourceCurrency, targetCurrency, 0.11, "someApi");
        invalids[1] = new CryptoExchangeRate(new Date(), undefined, targetCurrency, 0.11, "someApi");
        invalids[2] = new CryptoExchangeRate(new Date(), sourceCurrency, undefined, 0.11, "someApi");
        invalids[3] = new CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, undefined, "someApi");
        invalids[4] = new CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, 0.11, undefined);
        for(let iv of invalids){
            expect(!iv.valid()).to.eq(true);
        }
    });

    it('should be invalid with any null data', () => {
        let invalids = [];
        invalids[0] = new CryptoExchangeRate(null, sourceCurrency, targetCurrency, 0.11, "someApi");
        invalids[1] = new CryptoExchangeRate(new Date(), null, targetCurrency, 0.11, "someApi");
        invalids[2] = new CryptoExchangeRate(new Date(), sourceCurrency, null, 0.11, "someApi");
        invalids[3] = new CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, null, "someApi");
        invalids[4] = new CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, 0.11, null);
        invalids.forEach(iv => {
            expect(!iv.valid()).to.eq(true)
        })
    });

    it('should be invalid with any incorrectly typed data', () => {
        let invalids = [];
        invalids[0] = new CryptoExchangeRate(0 as any, sourceCurrency, targetCurrency, 0.11, "someApi");
        invalids[1] = new CryptoExchangeRate(new Date(), 8 as any, targetCurrency, 0.11, "someApi");
        invalids[2] = new CryptoExchangeRate(new Date(), sourceCurrency, 8 as any, 0.11, "someApi");
        invalids[3] = new CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, "0.11" as any, "someApi");
        invalids[4] = new CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, 0.11, 0 as any);
        invalids.forEach(iv => {
            console.log(iv);
            expect(!iv.valid()).to.eq(true)
        })
    });
});