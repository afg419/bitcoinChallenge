"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoTickerClient_1 = require("./CryptoTickerClient");
const Currency_1 = require("../core/Currency");
const CryptoExchangeRate_1 = require("../models/CryptoExchangeRate");
const util_1 = require("util");
const TypeValidator_1 = require("../core/TypeValidator");
class CoinCapTickerClient extends CryptoTickerClient_1.CryptoTickerClient {
    constructor(apiUrl, sourceCurrencies, targetCurrencies) {
        super(apiUrl, sourceCurrencies, targetCurrencies);
        this.apiName = "CoinCap";
    }
    createKeys(currencies) {
        return currencies.map(currency => new CoinCapKey(currency));
    }
    appendPathToUrl() {
        return this.apiUrl;
    }
    normalizeResponse(now, jsonArray) {
        let toReturn = [];
        this.sourceCurrencies.forEach(sourceCurrency => {
            let sourceCoinCapBlock = this.extractCoinCapResonseBlock(sourceCurrency, jsonArray);
            if (!sourceCoinCapBlock.valid) {
                return;
            }
            this.targetCurrencies.forEach(targetCurrency => {
                let targetCoinCapBlock = this.extractCoinCapResonseBlock(targetCurrency, jsonArray);
                if (!targetCoinCapBlock.valid) {
                    return;
                }
                toReturn.push(new CryptoExchangeRate_1.CryptoExchangeRate(now, sourceCurrency, targetCurrency, targetCoinCapBlock.exchangeRate(sourceCoinCapBlock), this.apiName));
            });
        });
        return toReturn;
    }
    ;
    extractCoinCapResonseBlock(currency, jsonArray) {
        let key = new CoinCapKey(currency);
        let jsonBlock = jsonArray.find(block => block["short"] === key.getKey());
        if (util_1.isNullOrUndefined(jsonBlock)) {
            return new CoinCapResonseBlock({ price: null });
        }
        return new CoinCapResonseBlock(jsonBlock);
    }
}
exports.CoinCapTickerClient = CoinCapTickerClient;
class CoinCapKey {
    constructor(currency) {
        this.currency = currency;
    }
    getKey() {
        return `${CoinCapKey.currencyToTextKey(this.currency)}`;
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
class CoinCapResonseBlock {
    constructor(coinCapBlock) {
        this.valid = true;
        if (!TypeValidator_1.TypeValidator.validNumber(parseFloat(coinCapBlock.price))) {
            console.warn("Received a Coincap block with invalid price information");
            this.valid = false;
        }
        this.price = parseFloat(coinCapBlock.price);
    }
    //x source coins for 1 target coin
    //(USD/ETH)/(USD/BTC) = (USD/ETH) * (BTC/USD) = BTC/ETH
    exchangeRate(sourceBlock) {
        return this.price / sourceBlock.price;
    }
}
//# sourceMappingURL=CoinCapTickerClient.js.map