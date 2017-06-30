import {CoinCapTickerClient} from "./CoinCapTickerClient";
import {BTCETickerClient} from "./BTCETickerClient";
import {PoloniexTickerClient} from "./PoloniexTickerClient";

export class CryptoTickerWorker {
    clients: CryptoTickerClient[];

    readonly run: () => void = () => { console.log(this.getClients()); }

    constructor(clients: CryptoTickerClient[]){
        this.clients = clients;
    }

    getClients(): CryptoTickerClient[]{
        return this.clients;
    };

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

// interface TypeClass<T> {
//     getType: () => string;
//     new (): T;
// }

let poloniex: PoloniexTickerClient = new PoloniexTickerClient("poloniexURL");
let btce: BTCETickerClient = new BTCETickerClient("btceUrl");
let coinCap: CoinCapTickerClient = new CoinCapTickerClient("coinCapUrl");

export let crypto: CryptoTickerWorker = new CryptoTickerWorker([poloniex, btce, coinCap]);
