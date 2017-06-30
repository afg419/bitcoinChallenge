export class PoloniexTickerClient implements CryptoTickerClient{
    apiUrl: string;
    getCryptoExchange(): CryptoExchangeRate[] {
        return [];
    }

    constructor(apiUrl: string){
        this.apiUrl = apiUrl;
    }
}