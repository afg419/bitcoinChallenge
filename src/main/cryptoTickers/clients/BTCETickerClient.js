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
var TypeValidator_1 = require("../../util/TypeValidator");
var BTCETickerClient = (function (_super) {
    __extends(BTCETickerClient, _super);
    function BTCETickerClient(apiUrl, sourceCurrencies, targetCurrencies) {
        var _this = _super.call(this, apiUrl, sourceCurrencies, targetCurrencies) || this;
        _this.apiName = "BTC-e";
        _this.exchangeKeys = _this.createKeys(sourceCurrencies, targetCurrencies);
        return _this;
    }
    BTCETickerClient.prototype.createKeys = function (sourceCurrencies, targetCurrencies) {
        var toReturn = [];
        sourceCurrencies.forEach(function (source) {
            targetCurrencies.forEach(function (target) {
                toReturn.push(new BTCEKey(source, target));
            });
        });
        return toReturn;
    };
    BTCETickerClient.prototype.appendPathToUrl = function () {
        var keyPath = this.exchangeKeys.map(function (key) { return key.getKey(); }).join("-");
        return this.apiUrl + "/" + keyPath;
    };
    BTCETickerClient.prototype.normalizeResponse = function (now, json) {
        var _this = this;
        return this.exchangeKeys.map(function (key) {
            var btceBlock = new BTCEResponseBlock(json[key.getKey()]);
            if (btceBlock.valid) {
                return new CryptoExchangeRate_1.CryptoExchangeRate(now, key.source, key.target, btceBlock.exchangeRate(), _this.apiName);
            }
            else {
                return null;
            }
        }).filter(Boolean);
    };
    return BTCETickerClient;
}(CryptoTickerClient_1.CryptoTickerClient));
exports.BTCETickerClient = BTCETickerClient;
var BTCEKey = (function () {
    function BTCEKey(source, target) {
        this.source = source;
        this.target = target;
    }
    BTCEKey.prototype.getKey = function () {
        return BTCEKey.currencyToKey(this.target) + "_" + BTCEKey.currencyToKey(this.source);
    };
    BTCEKey.currencyToKey = function (currency) {
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
    };
    return BTCEKey;
}());
var BTCEResponseBlock = (function () {
    function BTCEResponseBlock(btceBlock) {
        this.valid = true;
        if (!TypeValidator_1.TypeValidator.validNumber(btceBlock.buy)) {
            console.warn("Received a BTCE block with invalid buy information");
            this.valid = false;
        }
        this.buy = btceBlock.buy;
    }
    BTCEResponseBlock.prototype.exchangeRate = function () {
        return this.buy;
    };
    return BTCEResponseBlock;
}());
