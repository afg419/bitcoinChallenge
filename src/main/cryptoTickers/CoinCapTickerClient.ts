import {CryptoTickerClient} from "./CryptoTickerClient";
import {Currency} from "../../../api/Currency";
import {CryptoExchangeRate} from "../models/CryptoExchangeRate";
import {isNullOrUndefined} from "util";
import {TypeValidator} from "../../../api/TypeValidator";

export class CoinCapTickerClient extends CryptoTickerClient {
    readonly apiName: string = "CoinCap";

    constructor(apiUrl: string, sourceCurrencies: Currency[], targetCurrencies: Currency[]){
        super(apiUrl, sourceCurrencies, targetCurrencies);
    }

    private createKeys(currencies: Currency[]): CoinCapKey[]{
        return currencies.map(currency => new CoinCapKey(currency));
    }

    appendPathToUrl(): string {
        return this.apiUrl;
    }

    normalizeResponse(now: Date, jsonArray: any[]): CryptoExchangeRate[] {
        let toReturn: CryptoExchangeRate[] = [];

        this.sourceCurrencies.forEach( sourceCurrency => {
            let sourceCoinCapBlock = this.extractCoinCapResonseBlock(sourceCurrency, jsonArray);
            if(!sourceCoinCapBlock.valid) { return; }

            this.targetCurrencies.forEach( targetCurrency => {
                let targetCoinCapBlock = this.extractCoinCapResonseBlock(targetCurrency, jsonArray);
                if(!targetCoinCapBlock.valid) { return; }

                toReturn.push( new CryptoExchangeRate(now, sourceCurrency, targetCurrency, targetCoinCapBlock.exchangeRate(sourceCoinCapBlock), this.apiName) )
            })
        });

        return toReturn;
    };

    private extractCoinCapResonseBlock(currency: Currency, jsonArray: any[]): CoinCapResonseBlock {
        let key = new CoinCapKey(currency);
        let jsonBlock = jsonArray.find( block => block["short"] === key.getKey());

        if(isNullOrUndefined(jsonBlock)){ return new CoinCapResonseBlock({price: null}); }
        return new CoinCapResonseBlock(jsonBlock);
    }

}

class CoinCapKey {
    readonly currency: Currency;

    constructor(currency: Currency){
        this.currency = currency;
    }

    getKey(): string {
        return `${CoinCapKey.currencyToTextKey(this.currency)}`;
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

class CoinCapResonseBlock {
    readonly price: number;
    valid: boolean = true;

    constructor(coinCapBlock){
        if(!TypeValidator.validNumber(parseFloat(coinCapBlock.price))){
            console.warn("Received a Coincap block with invalid price information");
            this.valid = false;
        }

        this.price = parseFloat(coinCapBlock.price);
    }
    //x source coins for 1 target coin
    //(USD/ETH)/(USD/BTC) = (USD/ETH) * (BTC/USD) = BTC/ETH
    exchangeRate(sourceBlock: CoinCapResonseBlock): number {
        return this.price/sourceBlock.price;
    }
}