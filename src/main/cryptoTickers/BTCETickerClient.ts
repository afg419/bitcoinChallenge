import {CryptoTickerClient} from "./CryptoTickerClient";
import {Currency} from "../core/Currency";
import {CryptoExchangeRate} from "../models/CryptoExchangeRate";

export class BTCETickerClient extends CryptoTickerClient {
    readonly name: string = "BTC-E"

    constructor(apiUrl: string, sourceCurrencies: Currency[], targetCurrencies: Currency[]){
        super(apiUrl, sourceCurrencies, targetCurrencies);
    }

    appendToUrl(): string {
        return this.apiUrl;
    }

    normalizeResponse(now: Date, json:Response): CryptoExchangeRate[] {
        return [];
    }

}