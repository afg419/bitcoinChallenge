export class CryptoTickerWorker implements JobWorker {
    private readonly clients: CryptoTickerClient[];

    readonly run: () => void = () => { console.log(this.clients); }

    constructor(clients: CryptoTickerClient[]){
        this.clients = clients;
    }

    private getCurrentExchangeRates(): CryptoExchangeRate[] {
        let toReturn: CryptoExchangeRate[] = [];
        for( let client of this.clients ){
            toReturn.concat(client.getCryptoExchange())
        }
        return toReturn;
    }

    private saveCurrentExchangeRates(currentExchangeRates: CryptoExchangeRate[]){

    }
}