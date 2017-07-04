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
var Currency_1 = require("../../../../api/Currency");
var CryptoTickerClient_1 = require("./CryptoTickerClient");
var CryptoExchangeRate_1 = require("../../models/CryptoExchangeRate");
var TypeValidator_1 = require("../../util/TypeValidator");
var PoloniexTickerClient = (function (_super) {
    __extends(PoloniexTickerClient, _super);
    function PoloniexTickerClient(apiUrl, sourceCurrencies, targetCurrencies) {
        var _this = _super.call(this, apiUrl, sourceCurrencies, targetCurrencies) || this;
        _this.apiName = "Poloniex";
        _this.exchangeKeys = _this.createKeys(sourceCurrencies, targetCurrencies);
        return _this;
    }
    PoloniexTickerClient.prototype.createKeys = function (sourceCurrencies, targetCurrencies) {
        var toReturn = [];
        sourceCurrencies.forEach(function (source) {
            targetCurrencies.forEach(function (target) {
                toReturn.push(new PoloniexKey(source, target));
            });
        });
        return toReturn;
    };
    PoloniexTickerClient.prototype.appendPathToUrl = function () {
        return this.apiUrl;
    };
    PoloniexTickerClient.prototype.normalizeResponse = function (now, json) {
        var _this = this;
        return this.exchangeKeys.map(function (key) {
            var poloniexBlock = new PoloniexResponseBlock(json[key.getKey()]);
            if (poloniexBlock.valid) {
                return new CryptoExchangeRate_1.CryptoExchangeRate(now, key.source, key.target, poloniexBlock.exchangeRate(), _this.apiName);
            }
            else {
                return null;
            }
        }).filter(Boolean);
    };
    return PoloniexTickerClient;
}(CryptoTickerClient_1.CryptoTickerClient));
exports.PoloniexTickerClient = PoloniexTickerClient;
var PoloniexKey = (function () {
    function PoloniexKey(source, target) {
        this.source = source;
        this.target = target;
    }
    PoloniexKey.prototype.getKey = function () {
        return PoloniexKey.currencyToTextKey(this.source) + "_" + PoloniexKey.currencyToTextKey(this.target);
    };
    PoloniexKey.currencyToTextKey = function (currency) {
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
    return PoloniexKey;
}());
var PoloniexResponseBlock = (function () {
    function PoloniexResponseBlock(poloniexBlock) {
        this.valid = true;
        if (!TypeValidator_1.TypeValidator.validNumber(parseFloat(poloniexBlock.lowestAsk)) || !TypeValidator_1.TypeValidator.validNumber(parseFloat(poloniexBlock.highestBid))) {
            console.warn("Received a Poloniex block with invalid lowest or highest ask information");
            this.valid = false;
        }
        this.lowestAsk = parseFloat(poloniexBlock.lowestAsk);
        this.highestBid = parseFloat(poloniexBlock.highestBid);
    }
    PoloniexResponseBlock.prototype.exchangeRate = function () {
        return (this.lowestAsk + this.highestBid) / 2.0;
    };
    return PoloniexResponseBlock;
}());
