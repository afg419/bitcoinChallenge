import { CryptoExchangeRate, ExchangeDao } from "../models/CryptoExchangeRate";
import { CryptoTickerClient } from "./CryptoTickerClient";

export class CryptoTickerWorker implements JobWorker {
    private readonly clients: CryptoTickerClient[];

    readonly run: () => void = () => {
        this.getAndSaveCurrentExchangeRates()
    };

    constructor(clients: CryptoTickerClient[]){
        console.log("New ticker client!");
        this.clients = clients;
    }

    private getAndSaveCurrentExchangeRates(): void {
        console.log("beginning get and save pipeline!")
        for( let client of this.clients ){
            console.log(`Using ${client.apiName} to seek out exchanges.`)

            client.getCryptoExchange()
                .then(CryptoTickerWorker.validateExchanges)
                .then(CryptoTickerWorker.saveExchanges)
                .catch(err => console.log(`Unable to save exchanges for ${client.apiName}. ${err}`))
        }
    }

    private static validateExchanges(exchangeRates: CryptoExchangeRate[]): CryptoExchangeRate[]{
        console.log("validating!");
        return exchangeRates.filter( er => er.valid());
    }

    private static saveExchanges(validExchangeRates: CryptoExchangeRate[]){
        console.log("saving!");
        validExchangeRates.forEach( er => ExchangeDao.create(er));
    }
}