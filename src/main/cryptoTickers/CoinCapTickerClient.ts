import {CryptoTickerClient} from "./CryptoTickerClient";
import {Currency} from "../core/Currency";
import {CryptoExchangeRate} from "../models/CryptoExchangeRate";

export class CoinCapTickerClient extends CryptoTickerClient {
    readonly name: string = "CoinCap";

    constructor(apiUrl: string, sourceCurrencies: Currency[], targetCurrencies: Currency[]){
        super(apiUrl, sourceCurrencies, targetCurrencies);
    }

    appendPathToUrl(): string {
        return this.apiUrl;
    }

    normalizeResponse(now: Date, json:Response): CryptoExchangeRate[] {
        return [];
    }
}