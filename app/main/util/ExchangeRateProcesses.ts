import {ICryptoExchangeRate} from "../../../api/ICryptoExchangeRate";
import {Currency} from "../../../api/Currency";
import {isNullOrUndefined} from "util";
import {start} from "repl";
var _ = require('lodash');

export class ExchangeRateProcesses {
    static getApisForTargetCurrencyInOrderOfPerformance(exchangeHistory: { [key:string]: { [key:string]: ICryptoExchangeRate[]}; }, target: Currency ): ICryptoExchangeRate[] {
        let toReturn: ICryptoExchangeRate[] = [];
        for( let apiName in exchangeHistory ){
            try{
                let exchangeOfInterest = exchangeHistory[apiName][target][0];
                if(isNullOrUndefined(exchangeOfInterest)) {
                    console.warn(`${apiName} did not return any exchanges for ${target}`);
                } else {
                    toReturn.push(exchangeOfInterest);
                }
            } catch (err) {
                console.warn(`${apiName} did not return any exchanges for ${target}`);
            }
        }
        return toReturn.filter(Boolean).sort( (rate1, rate2) => rate2.rate - rate1.rate );
    }

    static formatExchangeRateHistory(startDate: Date, endDate: Date, exchangeRates: ICryptoExchangeRate[]): { [key:string]: { [key:string]: ICryptoExchangeRate[]}; } {
        //filters out out of date exchanges, and sorts them by date descending

        let ratesInRange = exchangeRates
            .filter(exchangeRate => (startDate <= exchangeRate.date && exchangeRate.date <= endDate)).sort( (rate1, rate2) => {
                return (new Date(rate2.date) as any) - (new Date(rate1.date) as any)
            });
        //groups remaining exchanges by api name and target currency... { apiName: { target: [ exchanges ] } }
        let namesToRatings: { [key:string]: ICryptoExchangeRate[]; }  = _.groupBy(ratesInRange, rate => rate.apiName);
        let toReturn: { [key:string]: { [key:string]: ICryptoExchangeRate[] } } = {};
        for (let key in namesToRatings) {
            console.log(key)
            toReturn[key] = _.groupBy(namesToRatings[key], rate => rate.target);
        }
        return toReturn;
    }
}