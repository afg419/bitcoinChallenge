"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoExchangeRate_1 = require("../models/CryptoExchangeRate");
class CryptoTickerWorker {
    constructor(clients) {
        this.run = () => {
            this.getAndSaveCurrentExchangeRates();
        };
        console.log("New ticker client!");
        this.clients = clients;
    }
    getAndSaveCurrentExchangeRates() {
        console.log("beginning get and save pipeline!");
        for (let client of this.clients) {
            console.log(`Using ${client.apiName} to seek out exchanges.`);
            client.getCryptoExchange()
                .then(CryptoTickerWorker.validateExchanges)
                .then(CryptoTickerWorker.saveExchanges)
                .catch(err => console.log(`Unable to save exchanges for ${client.apiName}. ${err}`));
        }
    }
    static validateExchanges(exchangeRates) {
        console.log("validating!");
        return exchangeRates.filter(er => er.valid());
    }
    static saveExchanges(validExchangeRates) {
        console.log("saving!");
        validExchangeRates.forEach(er => CryptoExchangeRate_1.ExchangeDao.create(er));
    }
}
exports.CryptoTickerWorker = CryptoTickerWorker;
//# sourceMappingURL=CryptoTickerWorker.js.map