import {Currency} from "../../../api/Currency";
import {CryptoExchangeRate} from "../models/CryptoExchangeRate";
var fetch = require('node-fetch');

export abstract class ExchangeRateApiClient{
    readonly apiUrl: string;
    readonly apiName: string;
    readonly sourceCurrencies: Currency[];
    readonly targetCurrencies: Currency[];

    constructor(apiUrl: string, sourceCurrencies: Currency[], targetCurrencies: Currency[]){
        this.apiUrl = apiUrl;
        this.sourceCurrencies = sourceCurrencies;
        this.targetCurrencies = targetCurrencies;
    }

    getCryptoExchange(): Promise<CryptoExchangeRate[]> {
        console.log(this.getCryptoExchangePath());
        return fetch(this.getCryptoExchangePath())
            .then(res => res.json())
            .then(json => this.normalizeExchangeRatesResponse(new Date(), json))
            .catch(err => {
                console.error(`Unable to acquire exchanges for ${this.apiName}. ${err}`);
                throw err
            });
    }

    abstract normalizeExchangeRatesResponse(now: Date, json: any): CryptoExchangeRate[];
    abstract getCryptoExchangePath(): string;
}