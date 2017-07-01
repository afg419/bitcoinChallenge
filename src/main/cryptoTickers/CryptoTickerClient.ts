import {Currency} from "../core/Currency";
import {CryptoExchangeRate} from "../models/CryptoExchangeRate";
var fetch = require('node-fetch');

export abstract class CryptoTickerClient{
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
        console.log(this.appendPathToUrl());
        return fetch(this.appendPathToUrl())
            .then(res => res.json())
            .then(json => this.normalizeResponse(new Date(), json))
            .catch(err => {
                console.error(`Unable to acquire exchanges for ${this.apiName}. ${err}`);
                throw err
            });
    }

    abstract normalizeResponse(now: Date, json: any): CryptoExchangeRate[];
    abstract appendPathToUrl(): string;
}