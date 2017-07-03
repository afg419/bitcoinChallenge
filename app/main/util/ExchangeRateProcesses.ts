import {ICryptoExchangeRate} from "../../../api/ICryptoExchangeRate";
import {Currency} from "../../../api/Currency";
import {isNullOrUndefined} from "util";
var _ = require('lodash');

export class ExchangeRateProcesses {
    //returns list of crypto exchanges rates (one per api) in order of rate
    static getApisForTargetCurrencyInOrderOfPerformance(exchangeHistory: { [key:string]: { [key:string]: ICryptoExchangeRate[]}; }, target: Currency ): ICryptoExchangeRate[] {
        if(isNullOrUndefined(exchangeHistory)){return []}

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
                console.warn(`${apiName} did not return any exchanges for ${target} ${err}`);
            }
        }
        return toReturn.filter(Boolean).sort( (rate1, rate2) => rate2.rate - rate1.rate );
    }

    static getCoinsInHistory(exchangeHistory: { [key:string]: { [key:string]: ICryptoExchangeRate[]}; }): Currency[]{
        if(isNullOrUndefined(exchangeHistory)){return []}
        let toReturn: number[] = [];
        for( let apiName in exchangeHistory ){
            for( let currency in exchangeHistory[apiName]){
                toReturn.push(parseInt(currency))
            }
        }
        return _.uniq(toReturn);
    }

    static getApisInHistory(exchangeHistory: { [key:string]: { [key:string]: ICryptoExchangeRate[]}; }): string[]{
        if(isNullOrUndefined(exchangeHistory)){return []}
        let toReturn: string[] = [];
        for( let apiName in exchangeHistory ){
            toReturn.push(apiName)
        }
        return _.uniq(toReturn);
    }


    //returns exchange rates as such { apiName: { target: [ exchanges ] } }
    static formatExchangeRateHistory(startDate: Date, endDate: Date, exchangeRates: ICryptoExchangeRate[]): { [key:string]: { [key:string]: ICryptoExchangeRate[]}; } {
        //filters out out of date exchanges, and sorts them by date descending

        let ratesInRange = exchangeRates
            .filter(exchangeRate => (startDate <= exchangeRate.date && exchangeRate.date <= endDate)).sort( (rate1, rate2) => {
                return (new Date(rate2.date) as any) - (new Date(rate1.date) as any)
            });
        //groups remaining exchanges by api name and target currency...
        let namesToRatings: { [key:string]: ICryptoExchangeRate[]; }  = _.groupBy(ratesInRange, rate => rate.apiName);
        let toReturn: { [key:string]: { [key:string]: ICryptoExchangeRate[] } } = {};
        for (let key in namesToRatings) {
            toReturn[key] = _.groupBy(namesToRatings[key], rate => rate.target);
        }
        return toReturn;
    }
}