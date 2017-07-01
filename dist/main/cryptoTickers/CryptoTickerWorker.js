"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CryptoTickerWorker {
    constructor(clients, dbClient) {
        this.run = () => {
            this.getAndSaveCurrentExchangeRates();
        };
        console.log("New ticker client!");
        this.clients = clients;
        this.dbClient = dbClient;
    }
    getAndSaveCurrentExchangeRates() {
        console.log("beginning get and save pipeline!");
        for (let client of this.clients) {
            console.log(`Using ${client.apiName} to seek out exchanges.`);
            client.getCryptoExchange()
                .then(exchanges => this.validateExchanges(exchanges))
                .then(exchanges => this.saveExchanges(exchanges))
                .catch(err => console.log(`Unable to save exchanges for ${client.apiName}. ${err}`));
        }
    }
    validateExchanges(exchangeRates) {
        console.log("validating!");
        return exchangeRates.filter(er => er.valid());
    }
    saveExchanges(validExchangeRates) {
        console.log("saving!");
        console.log(this);
        validExchangeRates.forEach(er => this.dbClient.create(er));
    }
}
exports.CryptoTickerWorker = CryptoTickerWorker;
//# sourceMappingURL=CryptoTickerWorker.js.map