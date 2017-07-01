"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoTickerClient_1 = require("../CryptoTickerClient");
const Currency_1 = require("../../core/Currency");
const CryptoExchangeRate_1 = require("../../models/CryptoExchangeRate");
const TypeValidator_1 = require("../../util/TypeValidator");
class BTCETickerClient extends CryptoTickerClient_1.CryptoTickerClient {
    constructor(apiUrl, sourceCurrencies, targetCurrencies) {
        super(apiUrl, sourceCurrencies, targetCurrencies);
        this.apiName = "BTC-e";
        this.exchangeKeys = this.createKeys(sourceCurrencies, targetCurrencies);
    }
    createKeys(sourceCurrencies, targetCurrencies) {
        let toReturn = [];
        sourceCurrencies.forEach(source => {
            targetCurrencies.forEach(target => {
                toReturn.push(new BTCEKey(source, target));
            });
        });
        return toReturn;
    }
    appendPathToUrl() {
        let keyPath = this.exchangeKeys.map(key => key.getKey()).join("-");
        return `${this.apiUrl}/${keyPath}`;
    }
    normalizeResponse(now, json) {
        return this.exchangeKeys.map(key => {
            let btceBlock = new BTCEResponseBlock(json[key.getKey()]);
            if (btceBlock.valid) {
                return new CryptoExchangeRate_1.CryptoExchangeRate(now, key.source, key.target, btceBlock.exchangeRate(), this.apiName);
            }
            else {
                return null;
            }
        }).filter(Boolean);
    }
}
exports.BTCETickerClient = BTCETickerClient;
class BTCEKey {
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }
    getKey() {
        return `${BTCEKey.currencyToKey(this.target)}_${BTCEKey.currencyToKey(this.source)}`;
    }
    static currencyToKey(currency) {
        switch (currency) {
            case Currency_1.Currency.BTC:
                return "btc";
            case Currency_1.Currency.DSH:
                return "dsh";
            case Currency_1.Currency.ETH:
                return "eth";
            case Currency_1.Currency.LTC:
                return "ltc";
        }
    }
}
class BTCEResponseBlock {
    constructor(btceBlock) {
        this.valid = true;
        if (!TypeValidator_1.TypeValidator.validNumber(btceBlock.buy)) {
            console.warn("Received a BTCE block with invalid buy information");
            this.valid = false;
        }
        this.buy = btceBlock.buy;
    }
    exchangeRate() {
        return this.buy;
    }
}
//# sourceMappingURL=BTCETickerClient.js.map