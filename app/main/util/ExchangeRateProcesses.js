"use strict";
exports.__esModule = true;
var util_1 = require("util");
var _ = require('lodash');
var ExchangeRateProcesses = (function () {
    function ExchangeRateProcesses() {
    }
    //returns list of crypto exchanges rates (one per api) in order of rate
    ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance = function (exchangeHistory, target) {
        if (util_1.isNullOrUndefined(exchangeHistory)) {
            return [];
        }
        var toReturn = [];
        for (var apiName in exchangeHistory) {
            try {
                var exchangeOfInterest = exchangeHistory[apiName][target][0];
                if (util_1.isNullOrUndefined(exchangeOfInterest)) {
                    console.warn(apiName + " did not return any exchanges for " + target);
                }
                else {
                    toReturn.push(exchangeOfInterest);
                }
            }
            catch (err) {
                console.warn(apiName + " did not return any exchanges for " + target + " " + err);
            }
        }
        return toReturn.filter(Boolean).sort(function (rate1, rate2) { return rate2.rate - rate1.rate; });
    };
    ExchangeRateProcesses.getCoinsInHistory = function (exchangeHistory) {
        if (util_1.isNullOrUndefined(exchangeHistory)) {
            return [];
        }
        var toReturn = [];
        for (var apiName in exchangeHistory) {
            for (var currency in exchangeHistory[apiName]) {
                toReturn.push(parseInt(currency));
            }
        }
        return _.uniq(toReturn);
    };
    ExchangeRateProcesses.getApisInHistory = function (exchangeHistory) {
        if (util_1.isNullOrUndefined(exchangeHistory)) {
            return [];
        }
        var toReturn = [];
        for (var apiName in exchangeHistory) {
            toReturn.push(apiName);
        }
        return _.uniq(toReturn);
    };
    ExchangeRateProcesses.getCoinHistoryByApi = function (currentCoin, exchangeHistory) {
        if (util_1.isNullOrUndefined(exchangeHistory)) { }
        var toReturn = {};
        for (var apiName in exchangeHistory) {
            toReturn[apiName] = exchangeHistory[apiName][currentCoin];
        }
        return toReturn;
    };
    //returns exchange rates as such { apiName: { target: [ exchanges ] } }
    ExchangeRateProcesses.formatExchangeRateHistory = function (startDate, endDate, exchangeRates) {
        //filters out out of date exchanges, and sorts them by date descending
        var ratesInRange = exchangeRates
            .filter(function (exchangeRate) { return (startDate <= exchangeRate.date && exchangeRate.date <= endDate); }).sort(function (rate1, rate2) {
            return new Date(rate2.date) - new Date(rate1.date);
        });
        //groups remaining exchanges by api name and target currency...
        var namesToRatings = _.groupBy(ratesInRange, function (rate) { return rate.apiName; });
        var toReturn = {};
        for (var key in namesToRatings) {
            toReturn[key] = _.groupBy(namesToRatings[key], function (rate) { return rate.target; });
        }
        return toReturn;
    };
    return ExchangeRateProcesses;
}());
exports.ExchangeRateProcesses = ExchangeRateProcesses;
