import {CryptoExchangeRate} from "../../models/CryptoExchangeRate";
import {Currency} from "../../../../api/Currency";
import {BitcoinAccount} from "../../models/BitcoinAccount";

export interface DBClient {
    createExchange(exchangeRate: CryptoExchangeRate): Promise<CryptoExchangeRate>;
    getExchangesBetween(startTime: Date, endTime: Date): Promise<CryptoExchangeRate[]>;
    deleteExchangesOlderThan(endTime: Date): void;
}