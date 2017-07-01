var _ = require('lodash');

module.exports = exchangeRateProcesses = {
    getMostRecentExchangeRates: function(exchangeRates){
        let toReturn = {};
        exchangeRates.forEach( exchangeRate => {
            toReturn[exchangeRate.apiName]
        })
    },

    getExchangeRateHistory: function(startDate, endDate, exchangeRates){
        let ratesInRange = exchangeRates
            .filter(exchangeRate => (startDate < exchangeRate.date && exchangeRate.date < endDate)).sort( (rate1, rate2) => {
                return rate1 > rate2 ? -1 : rate2 < rate1 ? 1 : 0;
            });
        return _.groupBy(ratesInRange, rate => rate.apiName)
    },
};