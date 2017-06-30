import {Currency} from "../core/Currency";
import { CryptoTickerClient } from "./CryptoTickerClient";
import { CryptoExchangeRate } from "../models/CryptoExchangeRate";
import {isStrictNullChecksEnabled} from "tslint";
import {isNullOrUndefined} from "util";

export class PoloniexTickerClient extends CryptoTickerClient {
    readonly apiName: string = "Poloniex";
    readonly exchangeKeys: Key[];

    constructor(apiUrl: string, sourceCurrencies: Currency[], targetCurrencies: Currency[]){
        super(apiUrl, sourceCurrencies, targetCurrencies);
        this.exchangeKeys = this.createKeys(sourceCurrencies, targetCurrencies);
    }

    private createKeys(sourceCurrencies: Currency[], targetCurrencies: Currency[]): Key[]{
        let toReturn: Key[] = [];
        sourceCurrencies.forEach( source => {
            targetCurrencies.forEach( target => {
                toReturn.push(new Key(source, target));
            })
        });
        return toReturn;
    }

    appendPathToUrl(): string {
        return this.apiUrl;
    }

    normalizeResponse(now: Date, json: any): CryptoExchangeRate[] {
        return this.exchangeKeys.map(key => {
            return new CryptoExchangeRate(
                now, key.source, key.target, new PoloniexResponseBlock(json[key.getKey()]).exchangeRate(), this.apiName
            )
        });
    }
}

class Key {
    readonly source: Currency;
    readonly target: Currency;

    constructor(source: Currency, target: Currency){
        this.source = source;
        this.target = target;
    }

    getKey(): string {
        return `${Key.currencyToKey(this.source)}_${Key.currencyToKey(this.target)}`;
    }

    private static currencyToKey(currency: Currency): string {
        switch(currency){
            case Currency.BTC:
                return "BTC";
            case Currency.DSH:
                return "DASH";
            case Currency.ETH:
                return "ETH";
            case Currency.LTC:
                return "LTC";
        }
    }
}

class PoloniexResponseBlock {
    readonly lowestAsk: number;
    readonly highestBid: number;

    constructor(poloniexBlock){
        if(isNullOrUndefined(poloniexBlock.lowestAsk) || isNullOrUndefined(poloniexBlock.highestBid)){
            throw "Insufficient data to create exchange rate."
        }
        this.lowestAsk = parseFloat(poloniexBlock.lowestAsk);
        this.highestBid = parseFloat(poloniexBlock.highestBid);
    }

    exchangeRate(): number {
        return (this.lowestAsk + this.highestBid) / 2.0
    }
}