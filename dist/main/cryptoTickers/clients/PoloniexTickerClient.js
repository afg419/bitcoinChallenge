"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Currency_1 = require("../../core/Currency");
const CryptoTickerClient_1 = require("../CryptoTickerClient");
const CryptoExchangeRate_1 = require("../../models/CryptoExchangeRate");
const TypeValidator_1 = require("../../util/TypeValidator");
class PoloniexTickerClient extends CryptoTickerClient_1.CryptoTickerClient {
    constructor(apiUrl, sourceCurrencies, targetCurrencies) {
        super(apiUrl, sourceCurrencies, targetCurrencies);
        this.apiName = "Poloniex";
        this.exchangeKeys = this.createKeys(sourceCurrencies, targetCurrencies);
    }
    createKeys(sourceCurrencies, targetCurrencies) {
        let toReturn = [];
        sourceCurrencies.forEach(source => {
            targetCurrencies.forEach(target => {
                toReturn.push(new PoloniexKey(source, target));
            });
        });
        return toReturn;
    }
    appendPathToUrl() {
        return this.apiUrl;
    }
    normalizeResponse(now, json) {
        return this.exchangeKeys.map(key => {
            let poloniexBlock = new PoloniexResponseBlock(json[key.getKey()]);
            if (poloniexBlock.valid) {
                return new CryptoExchangeRate_1.CryptoExchangeRate(now, key.source, key.target, poloniexBlock.exchangeRate(), this.apiName);
            }
            else {
                return null;
            }
        }).filter(Boolean);
    }
}
exports.PoloniexTickerClient = PoloniexTickerClient;
class PoloniexKey {
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }
    getKey() {
        return `${PoloniexKey.currencyToTextKey(this.source)}_${PoloniexKey.currencyToTextKey(this.target)}`;
    }
    static currencyToTextKey(currency) {
        switch (currency) {
            case Currency_1.Currency.BTC:
                return "BTC";
            case Currency_1.Currency.DSH:
                return "DASH";
            case Currency_1.Currency.ETH:
                return "ETH";
            case Currency_1.Currency.LTC:
                return "LTC";
        }
    }
}
class PoloniexResponseBlock {
    constructor(poloniexBlock) {
        this.valid = true;
        if (!TypeValidator_1.TypeValidator.validNumber(parseFloat(poloniexBlock.lowestAsk)) || !TypeValidator_1.TypeValidator.validNumber(parseFloat(poloniexBlock.highestBid))) {
            console.warn("Received a Poloniex block with invalid lowest or highest ask information");
            this.valid = false;
        }
        this.lowestAsk = parseFloat(poloniexBlock.lowestAsk);
        this.highestBid = parseFloat(poloniexBlock.highestBid);
    }
    exchangeRate() {
        return (this.lowestAsk + this.highestBid) / 2.0;
    }
}
//# sourceMappingURL=PoloniexTickerClient.js.map