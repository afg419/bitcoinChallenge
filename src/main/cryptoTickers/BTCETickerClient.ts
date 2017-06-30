export class BTCETickerClient implements CryptoTickerClient {
    apiUrl: string;
    getCryptoExchange(): CryptoExchangeRate[] {
        return [];
    }

    constructor(apiUrl: string){
        this.apiUrl = apiUrl;
    }
}