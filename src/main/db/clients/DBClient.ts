import {CryptoExchangeRate} from "../../models/CryptoExchangeRate";

export interface DBClient {
    create(exchangeRate: CryptoExchangeRate): Promise<CryptoExchangeRate>;
}