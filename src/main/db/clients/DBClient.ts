import {CryptoExchangeRate} from "../../models/CryptoExchangeRate";
import {Currency} from "../../../../api/Currency";

export interface DBClient {
    createExchange(exchangeRate: CryptoExchangeRate): Promise<CryptoExchangeRate>;
    getExchangesBetween(startTime: Date, endTime: Date): Promise<CryptoExchangeRate[]>;
    deleteExchangesOlderThan(endTime: Date): void;
}