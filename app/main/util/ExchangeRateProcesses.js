"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
var _ = require('lodash');
class ExchangeRateProcesses {
    //returns list of crypto exchanges rates (one per api) in order of rate
    static getApisForTargetCurrencyInOrderOfPerformance(exchangeHistory, target) {
        if (util_1.isNullOrUndefined(exchangeHistory)) {
            return [];
        }
        let toReturn = [];
        for (let apiName in exchangeHistory) {
            try {
                let exchangeOfInterest = exchangeHistory[apiName][target][0];
                if (util_1.isNullOrUndefined(exchangeOfInterest)) {
                    console.warn(`${apiName} did not return any exchanges for ${target}`);
                }
                else {
                    toReturn.push(exchangeOfInterest);
                }
            }
            catch (err) {
                console.warn(`${apiName} did not return any exchanges for ${target} ${err}`);
            }
        }
        return toReturn.filter(Boolean).sort((rate1, rate2) => rate2.rate - rate1.rate);
    }
    static getCoinsInHistory(exchangeHistory) {
        if (util_1.isNullOrUndefined(exchangeHistory)) {
            return [];
        }
        let toReturn = [];
        for (let apiName in exchangeHistory) {
            for (let currency in exchangeHistory[apiName]) {
                toReturn.push(parseInt(currency));
            }
        }
        return _.uniq(toReturn);
    }
    static getApisInHistory(exchangeHistory) {
        if (util_1.isNullOrUndefined(exchangeHistory)) {
            return [];
        }
        let toReturn = [];
        for (let apiName in exchangeHistory) {
            toReturn.push(apiName);
        }
        return _.uniq(toReturn);
    }
    //returns exchange rates as such { apiName: { target: [ exchanges ] } }
    static formatExchangeRateHistory(startDate, endDate, exchangeRates) {
        //filters out out of date exchanges, and sorts them by date descending
        let ratesInRange = exchangeRates
            .filter(exchangeRate => (startDate <= exchangeRate.date && exchangeRate.date <= endDate)).sort((rate1, rate2) => {
            return new Date(rate2.date) - new Date(rate1.date);
        });
        //groups remaining exchanges by api name and target currency...
        let namesToRatings = _.groupBy(ratesInRange, rate => rate.apiName);
        let toReturn = {};
        for (let key in namesToRatings) {
            toReturn[key] = _.groupBy(namesToRatings[key], rate => rate.target);
        }
        return toReturn;
    }
}
exports.ExchangeRateProcesses = ExchangeRateProcesses;
//# sourceMappingURL=ExchangeRateProcesses.js.map