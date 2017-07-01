"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Currency_1 = require("../../../api/Currency");
const CryptoExchangeRate_1 = require("../../main/models/CryptoExchangeRate");
var fetch = require('node-fetch');
describe('validates appropriately', () => {
    let sourceCurrency = Currency_1.Currency.BTC;
    let targetCurrency = Currency_1.Currency.ETH;
    it('should be valid with valid info', () => {
        let validExchangeRate = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, 0.11, "someApi");
        chai_1.expect(validExchangeRate.valid()).to.eq(true);
    });
    it('should be invalid with any undefined data', () => {
        let invalids = [];
        invalids[0] = new CryptoExchangeRate_1.CryptoExchangeRate(undefined, sourceCurrency, targetCurrency, 0.11, "someApi");
        invalids[1] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), undefined, targetCurrency, 0.11, "someApi");
        invalids[2] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), sourceCurrency, undefined, 0.11, "someApi");
        invalids[3] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, undefined, "someApi");
        invalids[4] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, 0.11, undefined);
        for (let iv of invalids) {
            chai_1.expect(!iv.valid()).to.eq(true);
        }
    });
    it('should be invalid with any null data', () => {
        let invalids = [];
        invalids[0] = new CryptoExchangeRate_1.CryptoExchangeRate(null, sourceCurrency, targetCurrency, 0.11, "someApi");
        invalids[1] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), null, targetCurrency, 0.11, "someApi");
        invalids[2] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), sourceCurrency, null, 0.11, "someApi");
        invalids[3] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, null, "someApi");
        invalids[4] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, 0.11, null);
        invalids.forEach(iv => {
            chai_1.expect(!iv.valid()).to.eq(true);
        });
    });
    it('should be invalid with any incorrectly typed data', () => {
        let invalids = [];
        invalids[0] = new CryptoExchangeRate_1.CryptoExchangeRate(0, sourceCurrency, targetCurrency, 0.11, "someApi");
        invalids[1] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), 8, targetCurrency, 0.11, "someApi");
        invalids[2] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), sourceCurrency, 8, 0.11, "someApi");
        invalids[3] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, "0.11", "someApi");
        invalids[4] = new CryptoExchangeRate_1.CryptoExchangeRate(new Date(), sourceCurrency, targetCurrency, 0.11, 0);
        invalids.forEach(iv => {
            console.log(iv);
            chai_1.expect(!iv.valid()).to.eq(true);
        });
    });
});
//# sourceMappingURL=CryptoExchangeRateTest.js.map