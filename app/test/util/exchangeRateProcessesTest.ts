import {ICrpytoExchangeRate} from "../../../api/ICrpytoExchangeRate";
import {Currency} from "../../../api/Currency";
import {ExchangeRateProcess} from "../../main/util/exchangeRateProcesses";
import { expect } from 'chai';


describe('Exchange rate processes', () => {
    let poloniex: string = "poloniex";
    let btcE: string = "btcE";
    let coinCap: string = "coinCap";

    let now: Date = new Date();

    let then: Date = new Date(now);
    then.setMinutes(now.getMinutes() - 60);

    let earlier: Date = new Date(now);
    earlier.setMinutes(now.getMinutes() - 120);

    let evenEarlier: Date = new Date(now);
    evenEarlier.setMinutes(now.getMinutes() - 180);


    it('should filter by date', () => {
        let exchangeRates: ICrpytoExchangeRate[] = [];
        exchangeRates[0] = makeCryptoExchangeRate(now, poloniex);
        exchangeRates[1] = makeCryptoExchangeRate(then, poloniex);
        exchangeRates[2] = makeCryptoExchangeRate(earlier, poloniex);
        exchangeRates[3] = makeCryptoExchangeRate(evenEarlier, poloniex);
        let response = ExchangeRateProcess.getExchangeRateHistory(earlier, now, exchangeRates)
        expect(response[poloniex].sort()).to.eql([exchangeRates[0], exchangeRates[1], exchangeRates[2]])
    });

    it('should sort by date', () => {
        let exchangeRates: ICrpytoExchangeRate[] = [];
        exchangeRates[1] = makeCryptoExchangeRate(now, poloniex);
        exchangeRates[0] = makeCryptoExchangeRate(then, poloniex);
        exchangeRates[2] = makeCryptoExchangeRate(earlier, poloniex);
        exchangeRates[3] = makeCryptoExchangeRate(evenEarlier, poloniex);
        let response = ExchangeRateProcess.getExchangeRateHistory(earlier, now, exchangeRates)
        expect(response[poloniex].sort()).to.eql([exchangeRates[1], exchangeRates[0], exchangeRates[2]])
    });

    let makeCryptoExchangeRate = function(date: Date, apiName: string): ICrpytoExchangeRate {
        return {
            source: Currency.BTC,
            target: Currency.ETH,
            rate: 0.11,
            apiName: apiName,
            date: date
        }
    }
});