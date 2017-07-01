import {DBClient} from "./DBClient";
import {CryptoExchangeRate} from "../../models/CryptoExchangeRate";
import {ExchangeDao} from "../../models/schemas/CryptoExchangeRateSchema";
import * as mongoose from "mongoose";

export class MongoClient implements DBClient {
    initializeDb(port, host: string): void {
        mongoose.connection.on('error', function(err) {
            console.error('Mongoose default connection error: ' + err);
            process.exit(1);
        });

        mongoose.connection.on('open', function(err) {
            if (err) {
                console.error(err);
                // log.error('Mongoose default connection error: ' + err);
                process.exit(1);
            }

            console.log(`ready to accept connections on port ${port}`);
        });
        mongoose.connect(host);

    }

    create(exchangeRate: CryptoExchangeRate): Promise<CryptoExchangeRate> {
        return ExchangeDao.create(exchangeRate);
    };
}