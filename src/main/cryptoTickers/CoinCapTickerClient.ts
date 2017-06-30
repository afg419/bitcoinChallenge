export class CoinCapTickerClient implements CryptoTickerClient {
    apiUrl: string;
    getCryptoExchange(): CryptoExchangeRate[] {
        return [];
    }

    sayHelloWorld(): string {
        return "hello world"
    }

    constructor(apiUrl: string){
        this.apiUrl = apiUrl;
    }
}