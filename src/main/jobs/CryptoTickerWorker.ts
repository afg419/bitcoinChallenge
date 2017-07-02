import { CryptoExchangeRate } from "../models/CryptoExchangeRate";
import { CryptoTickerClient } from "../cryptoTickers/CryptoTickerClient";
import {DBClient} from "../db/clients/DBClient";

export class CryptoTickerWorker implements JobWorker {
    private readonly clients: CryptoTickerClient[];
    private readonly dbClient: DBClient;

    readonly run: () => void = () => {
        this.getAndSaveCurrentExchangeRates()
    };

    constructor(clients: CryptoTickerClient[], dbClient: DBClient){
        console.log("New ticker client!");
        this.clients = clients;
        this.dbClient = dbClient;
    }

    private getAndSaveCurrentExchangeRates(): void {
        console.log("beginning get and save pipeline!")
        for( let client of this.clients ){
            console.log(`Using ${client.apiName} to seek out exchanges.`)

            client.getCryptoExchange()
                .then(exchanges => this.validateExchanges(exchanges))
                .then(exchanges => this.saveExchanges(exchanges))
                .catch(err => console.log(`Unable to save exchanges for ${client.apiName}. ${err}`))
        }
    }

    private validateExchanges(exchangeRates: CryptoExchangeRate[]): CryptoExchangeRate[] {
        console.log("validating!");
        return exchangeRates.filter( er => er.valid());
    }

    private saveExchanges(validExchangeRates: CryptoExchangeRate[]){
        console.log("saving!");
        validExchangeRates.forEach( er => this.dbClient.createExchange(er));
    }
}