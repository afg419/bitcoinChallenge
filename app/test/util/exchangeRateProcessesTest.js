"use strict";
exports.__esModule = true;
var Currency_1 = require("../../../api/Currency");
var ExchangeRateProcesses_1 = require("../../main/util/ExchangeRateProcesses");
var chai_1 = require("chai");
describe('Exchange rate processes', function () {
    var poloniex = "poloniex";
    var btcE = "btcE";
    var coinCap = "coinCap";
    var now = new Date();
    var then = new Date(now);
    then.setMinutes(now.getMinutes() - 60);
    var earlier = new Date(now);
    earlier.setMinutes(now.getMinutes() - 120);
    var evenEarlier = new Date(now);
    evenEarlier.setMinutes(now.getMinutes() - 180);
    it('should filter by date', function () {
        var exchangeRates = [];
        exchangeRates[0] = makeCryptoExchangeRate(now, poloniex, Currency_1.Currency.ETH);
        exchangeRates[1] = makeCryptoExchangeRate(then, poloniex, Currency_1.Currency.ETH);
        exchangeRates[2] = makeCryptoExchangeRate(earlier, poloniex, Currency_1.Currency.ETH);
        exchangeRates[3] = makeCryptoExchangeRate(evenEarlier, poloniex, Currency_1.Currency.ETH);
        var response = ExchangeRateProcesses_1.ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, exchangeRates);
        chai_1.expect(response[poloniex][Currency_1.Currency.ETH]).to.eql([exchangeRates[0], exchangeRates[1], exchangeRates[2]]);
    });
    it('should sort by date descending', function () {
        var exchangeRates = [];
        exchangeRates[1] = makeCryptoExchangeRate(now, poloniex, Currency_1.Currency.ETH);
        exchangeRates[0] = makeCryptoExchangeRate(then, poloniex, Currency_1.Currency.ETH);
        exchangeRates[2] = makeCryptoExchangeRate(earlier, poloniex, Currency_1.Currency.ETH);
        exchangeRates[3] = makeCryptoExchangeRate(evenEarlier, poloniex, Currency_1.Currency.ETH);
        var response = ExchangeRateProcesses_1.ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, exchangeRates);
        chai_1.expect(response[poloniex][Currency_1.Currency.ETH]).to.eql([exchangeRates[1], exchangeRates[0], exchangeRates[2]]);
    });
    it('should do so for multiple apis', function () {
        var poloniexCryptos = [];
        poloniexCryptos[1] = makeCryptoExchangeRate(now, poloniex, Currency_1.Currency.ETH);
        poloniexCryptos[0] = makeCryptoExchangeRate(then, poloniex, Currency_1.Currency.ETH);
        poloniexCryptos[2] = makeCryptoExchangeRate(earlier, poloniex, Currency_1.Currency.ETH);
        poloniexCryptos[3] = makeCryptoExchangeRate(evenEarlier, poloniex, Currency_1.Currency.ETH);
        var coinCapCryptos = [];
        coinCapCryptos[2] = makeCryptoExchangeRate(now, coinCap, Currency_1.Currency.ETH);
        coinCapCryptos[1] = makeCryptoExchangeRate(then, coinCap, Currency_1.Currency.ETH);
        coinCapCryptos[0] = makeCryptoExchangeRate(earlier, coinCap, Currency_1.Currency.ETH);
        coinCapCryptos[3] = makeCryptoExchangeRate(evenEarlier, coinCap, Currency_1.Currency.ETH);
        var response = ExchangeRateProcesses_1.ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, poloniexCryptos.concat(coinCapCryptos));
        chai_1.expect(response[poloniex][Currency_1.Currency.ETH]).to.eql([poloniexCryptos[1], poloniexCryptos[0], poloniexCryptos[2]]);
        chai_1.expect(response[coinCap][Currency_1.Currency.ETH]).to.eql([coinCapCryptos[2], coinCapCryptos[1], coinCapCryptos[0]]);
    });
    it('should do so for multiple target coins', function () {
        var poloniexCryptos = [];
        poloniexCryptos[1] = makeCryptoExchangeRate(now, poloniex, Currency_1.Currency.ETH);
        poloniexCryptos[0] = makeCryptoExchangeRate(then, poloniex, Currency_1.Currency.ETH);
        poloniexCryptos[2] = makeCryptoExchangeRate(earlier, poloniex, Currency_1.Currency.DSH);
        poloniexCryptos[3] = makeCryptoExchangeRate(evenEarlier, poloniex, Currency_1.Currency.DSH);
        poloniexCryptos[4] = makeCryptoExchangeRate(then, poloniex, Currency_1.Currency.DSH);
        var response = ExchangeRateProcesses_1.ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, poloniexCryptos);
        chai_1.expect(response[poloniex][Currency_1.Currency.ETH]).to.eql([poloniexCryptos[1], poloniexCryptos[0]]);
        chai_1.expect(response[poloniex][Currency_1.Currency.DSH]).to.eql([poloniexCryptos[4], poloniexCryptos[2]]);
    });
    it('should extract most recent crypto in timerange', function () {
        var poloniexCryptos = [];
        var coinCapCryptos = [];
        poloniexCryptos[1] = makeCryptoExchangeRateForRank(now, poloniex, Currency_1.Currency.ETH, 0.11); //this guy vs
        coinCapCryptos[0] = makeCryptoExchangeRateForRank(now, coinCap, Currency_1.Currency.ETH, 0.10); //this guy
        poloniexCryptos[2] = makeCryptoExchangeRateForRank(now, poloniex, Currency_1.Currency.DSH, 0.4); //This guy vs
        coinCapCryptos[2] = makeCryptoExchangeRateForRank(then, coinCap, Currency_1.Currency.DSH, 0.56); //this guy
        poloniexCryptos[0] = makeCryptoExchangeRateForRank(then, poloniex, Currency_1.Currency.ETH, 1);
        coinCapCryptos[1] = makeCryptoExchangeRateForRank(earlier, coinCap, Currency_1.Currency.DSH, 1);
        var history = ExchangeRateProcesses_1.ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, poloniexCryptos.concat(coinCapCryptos));
        var ethResponse = ExchangeRateProcesses_1.ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(history, Currency_1.Currency.ETH);
        var dshResponse = ExchangeRateProcesses_1.ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(history, Currency_1.Currency.DSH);
        chai_1.expect(ethResponse).to.eql([poloniexCryptos[1], coinCapCryptos[0]]);
        chai_1.expect(dshResponse).to.eql([coinCapCryptos[2], poloniexCryptos[2]]);
    });
    //the history in this one will have coinCap with no DSH coins, we expect poloniex to just win.
    it('should ignore missing apis from history', function () {
        var poloniexCryptos = [];
        var coinCapCryptos = [];
        poloniexCryptos[1] = makeCryptoExchangeRateForRank(now, poloniex, Currency_1.Currency.ETH, 0.11); //this guy vs
        coinCapCryptos[0] = makeCryptoExchangeRateForRank(now, coinCap, Currency_1.Currency.ETH, 0.10); //this guy
        poloniexCryptos[2] = makeCryptoExchangeRateForRank(now, poloniex, Currency_1.Currency.DSH, 0.4); //This guy
        poloniexCryptos[0] = makeCryptoExchangeRateForRank(then, poloniex, Currency_1.Currency.ETH, 1);
        var history = ExchangeRateProcesses_1.ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, poloniexCryptos.concat(coinCapCryptos));
        var ethResponse = ExchangeRateProcesses_1.ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(history, Currency_1.Currency.ETH);
        var dshResponse = ExchangeRateProcesses_1.ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(history, Currency_1.Currency.DSH);
        chai_1.expect(ethResponse).to.eql([poloniexCryptos[1], coinCapCryptos[0]]);
        chai_1.expect(dshResponse).to.eql([poloniexCryptos[2]]);
    });
    var makeCryptoExchangeRate = function (date, apiName, target) {
        return {
            source: Currency_1.Currency.BTC,
            target: target,
            rate: 0.11,
            apiName: apiName,
            date: date
        };
    };
    var makeCryptoExchangeRateForRank = function (date, apiName, target, rate) {
        return {
            source: Currency_1.Currency.BTC,
            target: target,
            rate: rate,
            apiName: apiName,
            date: date
        };
    };
});
