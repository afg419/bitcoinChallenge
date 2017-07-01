import {CryptoExchangeRate} from "../../models/CryptoExchangeRate";

export interface DBClient {
    createExchange(exchangeRate: CryptoExchangeRate): Promise<CryptoExchangeRate>;
    getExchangesBetween(startTime: Date, endTime: Date): Promise<CryptoExchangeRate[]>;
}