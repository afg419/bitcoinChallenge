import {ICrpytoExchangeRate} from "../../../api/ICrpytoExchangeRate";
import {Currency} from "../../../api/Currency";
import {isNullOrUndefined} from "util";
import {start} from "repl";
var _ = require('lodash');

export class ExchangeRateProcess {
    static getApisForTargetCurrencyInOrderOfPerformance( exchangeHistory: { [key:string]: { [key:string]: ICrpytoExchangeRate[]}; }, target: Currency ): ICrpytoExchangeRate[] {
        let toReturn: ICrpytoExchangeRate[] = [];
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

    static formatExchangeRateHistory(startDate: Date, endDate: Date, exchangeRates: ICrpytoExchangeRate[]): { [key:string]: { [key:string]: ICrpytoExchangeRate[]}; } {
        //filters out out of date exchanges, and sorts them by date descending
        let ratesInRange = exchangeRates
            .filter(exchangeRate => (startDate <= exchangeRate.date && exchangeRate.date <= endDate)).sort( (rate1, rate2) => {
                return (rate2.date as any) - (rate1.date as any)
            });

        //groups remaining exchanges by api name and target currency... { apiName: { target: [ exchanges ] } }
        let namesToRatings: { [key:string]: ICrpytoExchangeRate[]; }  = _.groupBy(ratesInRange, rate => rate.apiName);
        let toReturn: { [key:string]: { [key:string]: ICrpytoExchangeRate[] } } = {};
        for (let key in namesToRatings) {
            toReturn[key] = _.groupBy(namesToRatings[key], rate => rate.target);
        }

        return toReturn;
    }
}