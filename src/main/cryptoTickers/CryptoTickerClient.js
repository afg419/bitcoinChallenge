"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetch = require('node-fetch');
class CryptoTickerClient {
    constructor(apiUrl, sourceCurrencies, targetCurrencies) {
        this.apiUrl = apiUrl;
        this.sourceCurrencies = sourceCurrencies;
        this.targetCurrencies = targetCurrencies;
    }
    getCryptoExchange() {
        console.log(this.appendPathToUrl());
        return fetch(this.appendPathToUrl())
            .then(res => res.json())
            .then(json => this.normalizeResponse(new Date(), json))
            .catch(err => {
            console.error(`Unable to acquire exchanges for ${this.apiName}. ${err}`);
            throw err;
        });
    }
}
exports.CryptoTickerClient = CryptoTickerClient;
//# sourceMappingURL=CryptoTickerClient.js.map