"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var CryptoTickerClient_1 = require("./CryptoTickerClient");
var Currency_1 = require("../../../../api/Currency");
var CryptoExchangeRate_1 = require("../../models/CryptoExchangeRate");
var util_1 = require("util");
var TypeValidator_1 = require("../../util/TypeValidator");
var CoinCapTickerClient = (function (_super) {
    __extends(CoinCapTickerClient, _super);
    function CoinCapTickerClient(apiUrl, sourceCurrencies, targetCurrencies) {
        var _this = _super.call(this, apiUrl, sourceCurrencies, targetCurrencies) || this;
        _this.apiName = "CoinCap";
        return _this;
    }
    CoinCapTickerClient.prototype.createKeys = function (currencies) {
        return currencies.map(function (currency) { return new CoinCapKey(currency); });
    };
    CoinCapTickerClient.prototype.appendPathToUrl = function () {
        return this.apiUrl;
    };
    CoinCapTickerClient.prototype.normalizeResponse = function (now, jsonArray) {
        var _this = this;
        var toReturn = [];
        this.sourceCurrencies.forEach(function (sourceCurrency) {
            var sourceCoinCapBlock = _this.extractCoinCapResonseBlock(sourceCurrency, jsonArray);
            if (!sourceCoinCapBlock.valid) {
                return;
            }
            _this.targetCurrencies.forEach(function (targetCurrency) {
                var targetCoinCapBlock = _this.extractCoinCapResonseBlock(targetCurrency, jsonArray);
                if (!targetCoinCapBlock.valid) {
                    return;
                }
                toReturn.push(new CryptoExchangeRate_1.CryptoExchangeRate(now, sourceCurrency, targetCurrency, targetCoinCapBlock.exchangeRate(sourceCoinCapBlock), _this.apiName));
            });
        });
        return toReturn;
    };
    ;
    CoinCapTickerClient.prototype.extractCoinCapResonseBlock = function (currency, jsonArray) {
        var key = new CoinCapKey(currency);
        var jsonBlock = jsonArray.find(function (block) { return block["short"] === key.getKey(); });
        if (util_1.isNullOrUndefined(jsonBlock)) {
            return new CoinCapResonseBlock({ price: null });
        }
        return new CoinCapResonseBlock(jsonBlock);
    };
    return CoinCapTickerClient;
}(CryptoTickerClient_1.CryptoTickerClient));
exports.CoinCapTickerClient = CoinCapTickerClient;
var CoinCapKey = (function () {
    function CoinCapKey(currency) {
        this.currency = currency;
    }
    CoinCapKey.prototype.getKey = function () {
        return "" + CoinCapKey.currencyToTextKey(this.currency);
    };
    CoinCapKey.currencyToTextKey = function (currency) {
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
    };
    return CoinCapKey;
}());
var CoinCapResonseBlock = (function () {
    function CoinCapResonseBlock(coinCapBlock) {
        this.valid = true;
        if (!TypeValidator_1.TypeValidator.validNumber(parseFloat(coinCapBlock.price))) {
            console.warn("Received a Coincap block with invalid price information");
            this.valid = false;
        }
        this.price = parseFloat(coinCapBlock.price);
    }
    //x source coins for 1 target coin
    //(USD/ETH)/(USD/BTC) = (USD/ETH) * (BTC/USD) = BTC/ETH
    CoinCapResonseBlock.prototype.exchangeRate = function (sourceBlock) {
        return this.price / sourceBlock.price;
    };
    return CoinCapResonseBlock;
}());
