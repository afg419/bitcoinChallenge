import {ExchangeRateApiClient} from "./ExchangeRateApiClient";
import {Currency} from "../../../api/Currency";
import {CryptoExchangeRate} from "../models/CryptoExchangeRate";
import {isNullOrUndefined} from "util";
import {TypeValidator} from "../../../api/TypeValidator";

export class BTCETickerClient extends ExchangeRateApiClient {
    readonly apiName: string = "BTC-e";
    readonly exchangeKeys: BTCEKey[];

    constructor(apiUrl: string, sourceCurrencies: Currency[], targetCurrencies: Currency[]){
        super(apiUrl, sourceCurrencies, targetCurrencies);
        this.exchangeKeys = this.createKeys(sourceCurrencies, targetCurrencies);
    }

    private createKeys(sourceCurrencies: Currency[], targetCurrencies: Currency[]): BTCEKey[]{
        let toReturn: BTCEKey[] = [];
        sourceCurrencies.forEach( source => {
            targetCurrencies.forEach( target => {
                toReturn.push(new BTCEKey(source, target));
            })
        });
        return toReturn;
    }

    getCryptoExchangePath(): string {
        let keyPath = this.exchangeKeys.map(key => key.getKey()).join("-");
        return `${this.apiUrl}/${keyPath}`;
    }

    normalizeExchangeRatesResponse(now: Date, json: any): CryptoExchangeRate[] {
        return this.exchangeKeys.map( key => {
            let btceBlock = new BTCEResponseBlock(json[key.getKey()]);

            if(btceBlock.valid){
                return new CryptoExchangeRate( now, key.source, key.target, btceBlock.exchangeRate(), this.apiName)
            } else {
                return null;
            }
        }).filter(Boolean)
    }
}

class BTCEKey {
    readonly source: Currency;
    readonly target: Currency;

    constructor(source: Currency, target: Currency){
        this.source = source;
        this.target = target;
    }

    getKey(): string {
        return `${BTCEKey.currencyToKey(this.target)}_${BTCEKey.currencyToKey(this.source)}`;
    }

    private static currencyToKey(currency: Currency): string {
        switch(currency){
            case Currency.BTC:
                return "btc";
            case Currency.DSH:
                return "dsh";
            case Currency.ETH:
                return "eth";
            case Currency.LTC:
                return "ltc";
        }
    }
}

class BTCEResponseBlock {
    readonly buy: number;
    valid: boolean = true;

    constructor(btceBlock){
        if(!TypeValidator.validNumber(btceBlock.buy)){
            console.warn("Received a BTCE block with invalid buy information");
            this.valid = false;
        }

        this.buy = btceBlock.buy
    }

    exchangeRate(): number {
        return this.buy;
    }
}