import {Currency} from "../../../api/Currency";
import { CryptoTickerClient } from "./CryptoTickerClient";
import { CryptoExchangeRate } from "../models/CryptoExchangeRate";
import {isNullOrUndefined} from "util";
import {TypeValidator} from "../../../api/TypeValidator";

export class PoloniexTickerClient extends CryptoTickerClient {
    readonly apiName: string = "Poloniex";
    readonly exchangeKeys: PoloniexKey[];

    constructor(apiUrl: string, sourceCurrencies: Currency[], targetCurrencies: Currency[]){
        super(apiUrl, sourceCurrencies, targetCurrencies);
        this.exchangeKeys = this.createKeys(sourceCurrencies, targetCurrencies);
    }

    private createKeys(sourceCurrencies: Currency[], targetCurrencies: Currency[]): PoloniexKey[]{
        let toReturn: PoloniexKey[] = [];
        sourceCurrencies.forEach( source => {
            targetCurrencies.forEach( target => {
                toReturn.push(new PoloniexKey(source, target));
            })
        });
        return toReturn;
    }

    appendPathToUrl(): string {
        return this.apiUrl;
    }

    normalizeResponse(now: Date, json: any): CryptoExchangeRate[] {
        return this.exchangeKeys.map(key => {
            let poloniexBlock = new PoloniexResponseBlock(json[key.getKey()]);

            if(poloniexBlock.valid){
                return new CryptoExchangeRate(
                    now, key.source, key.target, poloniexBlock.exchangeRate(), this.apiName
                )
            } else {
                return null;
            }
        }).filter(Boolean);
    }
}

class PoloniexKey {
    readonly source: Currency;
    readonly target: Currency;

    constructor(source: Currency, target: Currency){
        this.source = source;
        this.target = target;
    }

    getKey(): string {
        return `${PoloniexKey.currencyToTextKey(this.source)}_${PoloniexKey.currencyToTextKey(this.target)}`;
    }

    private static currencyToTextKey(currency: Currency): string {
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
    valid: boolean = true;

    constructor(poloniexBlock){
        if(!TypeValidator.validNumber(parseFloat(poloniexBlock.lowestAsk)) || !TypeValidator.validNumber(parseFloat(poloniexBlock.highestBid))){
            console.warn("Received a Poloniex block with invalid lowest or highest ask information");
            this.valid = false;
        }

        this.lowestAsk = parseFloat(poloniexBlock.lowestAsk);
        this.highestBid = parseFloat(poloniexBlock.highestBid);
    }

    exchangeRate(): number {
        return (this.lowestAsk + this.highestBid) / 2.0
    }
}