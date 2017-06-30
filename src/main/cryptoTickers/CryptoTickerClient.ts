interface CryptoTickerClient{
    apiUrl: string;
    getCryptoExchange(): CryptoExchangeRate[]
}