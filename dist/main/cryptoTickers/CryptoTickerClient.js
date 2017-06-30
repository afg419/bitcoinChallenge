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
            .then(res => {
            return res.json();
        })
            .then(this.normalizeResponse.bind(this, new Date()))
            .catch(err => {
            console.error(`Unable to acquire exchanges for ${this.apiName}. ${err}`);
            throw err;
        });
    }
}
exports.CryptoTickerClient = CryptoTickerClient;
//# sourceMappingURL=CryptoTickerClient.js.map