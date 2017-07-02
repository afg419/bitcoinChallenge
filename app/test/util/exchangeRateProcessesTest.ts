import {ICrpytoExchangeRate} from "../../../api/ICrpytoExchangeRate";
import {Currency} from "../../../api/Currency";
import {ExchangeRateProcesses} from "../../main/util/ExchangeRateProcesses";
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
        exchangeRates[0] = makeCryptoExchangeRate(now, poloniex, Currency.ETH);
        exchangeRates[1] = makeCryptoExchangeRate(then, poloniex, Currency.ETH);
        exchangeRates[2] = makeCryptoExchangeRate(earlier, poloniex, Currency.ETH);
        exchangeRates[3] = makeCryptoExchangeRate(evenEarlier, poloniex, Currency.ETH);
        let response = ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, exchangeRates)
        expect(response[poloniex][Currency.ETH]).to.eql([exchangeRates[0], exchangeRates[1], exchangeRates[2]])
    });

    it('should sort by date descending', () => {
        let exchangeRates: ICrpytoExchangeRate[] = [];
        exchangeRates[1] = makeCryptoExchangeRate(now, poloniex, Currency.ETH);
        exchangeRates[0] = makeCryptoExchangeRate(then, poloniex, Currency.ETH);
        exchangeRates[2] = makeCryptoExchangeRate(earlier, poloniex, Currency.ETH);
        exchangeRates[3] = makeCryptoExchangeRate(evenEarlier, poloniex, Currency.ETH);
        let response = ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, exchangeRates)
        expect(response[poloniex][Currency.ETH]).to.eql([exchangeRates[1], exchangeRates[0], exchangeRates[2]])
    });

    it('should do so for multiple apis', () => {
        let poloniexCryptos: ICrpytoExchangeRate[] = [];
        poloniexCryptos[1] = makeCryptoExchangeRate(now, poloniex, Currency.ETH);
        poloniexCryptos[0] = makeCryptoExchangeRate(then, poloniex, Currency.ETH);
        poloniexCryptos[2] = makeCryptoExchangeRate(earlier, poloniex, Currency.ETH);
        poloniexCryptos[3] = makeCryptoExchangeRate(evenEarlier, poloniex, Currency.ETH);

        let coinCapCryptos: ICrpytoExchangeRate[] = [];
        coinCapCryptos[2] = makeCryptoExchangeRate(now, coinCap, Currency.ETH);
        coinCapCryptos[1] = makeCryptoExchangeRate(then, coinCap, Currency.ETH);
        coinCapCryptos[0] = makeCryptoExchangeRate(earlier, coinCap, Currency.ETH);
        coinCapCryptos[3] = makeCryptoExchangeRate(evenEarlier, coinCap, Currency.ETH);

        let response = ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, poloniexCryptos.concat(coinCapCryptos))
        expect(response[poloniex][Currency.ETH]).to.eql([poloniexCryptos[1], poloniexCryptos[0], poloniexCryptos[2]])
        expect(response[coinCap][Currency.ETH]).to.eql([coinCapCryptos[2], coinCapCryptos[1], coinCapCryptos[0]])
    });

    it('should do so for multiple target coins', () => {
        let poloniexCryptos: ICrpytoExchangeRate[] = [];
        poloniexCryptos[1] = makeCryptoExchangeRate(now, poloniex, Currency.ETH);
        poloniexCryptos[0] = makeCryptoExchangeRate(then, poloniex, Currency.ETH);
        poloniexCryptos[2] = makeCryptoExchangeRate(earlier, poloniex, Currency.DSH);
        poloniexCryptos[3] = makeCryptoExchangeRate(evenEarlier, poloniex, Currency.DSH);
        poloniexCryptos[4] = makeCryptoExchangeRate(then, poloniex, Currency.DSH);

        let response = ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, poloniexCryptos);
        expect(response[poloniex][Currency.ETH]).to.eql([poloniexCryptos[1], poloniexCryptos[0]]);
        expect(response[poloniex][Currency.DSH]).to.eql([poloniexCryptos[4], poloniexCryptos[2]])
    });

    it('should extract most recent crypto in timerange', () => {
        let poloniexCryptos: ICrpytoExchangeRate[] = [];
        let coinCapCryptos: ICrpytoExchangeRate[] = [];

        poloniexCryptos[1] = makeCryptoExchangeRateForRank(now, poloniex, Currency.ETH, 0.11); //this guy vs
        coinCapCryptos[0] = makeCryptoExchangeRateForRank(now, coinCap, Currency.ETH, 0.10); //this guy

        poloniexCryptos[2] = makeCryptoExchangeRateForRank(now, poloniex, Currency.DSH, 0.4); //This guy vs
        coinCapCryptos[2] = makeCryptoExchangeRateForRank(then, coinCap, Currency.DSH, 0.56); //this guy

        poloniexCryptos[0] = makeCryptoExchangeRateForRank(then, poloniex, Currency.ETH, 1);
        coinCapCryptos[1] = makeCryptoExchangeRateForRank(earlier, coinCap, Currency.DSH, 1);

        let history = ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, poloniexCryptos.concat(coinCapCryptos))
        let ethResponse = ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(history, Currency.ETH);
        let dshResponse = ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(history, Currency.DSH);
        expect(ethResponse).to.eql([poloniexCryptos[1], coinCapCryptos[0]]);
        expect(dshResponse).to.eql([coinCapCryptos[2], poloniexCryptos[2]]);
    });

    //the history in this one will have coinCap with no DSH coins, we expect poloniex to just win.
    it('should ignore missing apis from history', () => {
        let poloniexCryptos: ICrpytoExchangeRate[] = [];
        let coinCapCryptos: ICrpytoExchangeRate[] = [];

        poloniexCryptos[1] = makeCryptoExchangeRateForRank(now, poloniex, Currency.ETH, 0.11); //this guy vs
        coinCapCryptos[0] = makeCryptoExchangeRateForRank(now, coinCap, Currency.ETH, 0.10); //this guy

        poloniexCryptos[2] = makeCryptoExchangeRateForRank(now, poloniex, Currency.DSH, 0.4); //This guy
        poloniexCryptos[0] = makeCryptoExchangeRateForRank(then, poloniex, Currency.ETH, 1);

        let history = ExchangeRateProcesses.formatExchangeRateHistory(earlier, now, poloniexCryptos.concat(coinCapCryptos))
        let ethResponse = ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(history, Currency.ETH);
        let dshResponse = ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(history, Currency.DSH);
        expect(ethResponse).to.eql([poloniexCryptos[1], coinCapCryptos[0]]);
        expect(dshResponse).to.eql([poloniexCryptos[2]]);
    });

    let makeCryptoExchangeRate = function(date: Date, apiName: string, target: Currency): ICrpytoExchangeRate {
        return {
            source: Currency.BTC,
            target: target,
            rate: 0.11,
            apiName: apiName,
            date: date
        }
    };

    let makeCryptoExchangeRateForRank = function(date: Date, apiName: string, target: Currency, rate: number): ICrpytoExchangeRate {
        return {
            source: Currency.BTC,
            target: target,
            rate: rate,
            apiName: apiName,
            date: date
        }
    }
});