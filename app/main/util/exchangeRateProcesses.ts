var _ = require('lodash');

export class ExchangeRateProcess {
    // static getMostRecentExchangeRates(exchangeRates){
    //     let toReturn = {};
    //     exchangeRates.forEach( exchangeRate => {
    //         toReturn[exchangeRate.apiName]
    //     })
    // }

    static getExchangeRateHistory(startDate, endDate, exchangeRates){
        let ratesInRange = exchangeRates
            .filter(exchangeRate => (startDate <= exchangeRate.date && exchangeRate.date <= endDate)).sort( (rate1, rate2) => {
                return rate1.date - rate2.date
            });
        return _.groupBy(ratesInRange, rate => rate.apiName)
    }
};