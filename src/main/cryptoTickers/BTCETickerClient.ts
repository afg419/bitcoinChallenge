import {CryptoTickerClient} from "./CryptoTickerClient";
import {Currency} from "../core/Currency";
import {CryptoExchangeRate} from "../models/CryptoExchangeRate";
import {isNullOrUndefined} from "util";
//eth_btc-ltc_btc-dsh_btc
export class BTCETickerClient extends CryptoTickerClient {
    readonly apiName: string = "BTC-e";
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
        let keyPath = this.exchangeKeys.map(key => key.getKey()).join("-");
        return `${this.apiUrl}/${keyPath}`;
    }

    normalizeResponse(now: Date, json: any): CryptoExchangeRate[] {
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

class Key {
    readonly source: Currency;
    readonly target: Currency;

    constructor(source: Currency, target: Currency){
        this.source = source;
        this.target = target;
    }

    getKey(): string {
        return `${Key.currencyToKey(this.target)}_${Key.currencyToKey(this.source)}`;
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
        if(isNullOrUndefined(btceBlock.buy)){
            console.warn("Received a BTCE block with no buy information");
            this.valid = false;
        }

        this.buy = btceBlock.buy
    }

    exchangeRate(): number {
        return this.buy;
    }
}