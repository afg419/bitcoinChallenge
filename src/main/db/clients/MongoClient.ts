import {DBClient} from "./DBClient";
import {CryptoExchangeRate} from "../../models/CryptoExchangeRate";
import {CryptoExchangeRateDao} from "../../models/schemas/CryptoExchangeRateSchema";
import * as mongoose from "mongoose";
import {start} from "repl";

export class MongoDBClient implements DBClient {
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

    createExchange(exchangeRate: CryptoExchangeRate): Promise<CryptoExchangeRate> {
        return CryptoExchangeRateDao.create(exchangeRate);
    };

    getExchangesBetween(startTime: Date, endTime: Date): Promise<CryptoExchangeRate[]>{
        return CryptoExchangeRateDao.find({$and:[{date:{$lte:startTime}},{date:{$gte:endTime}}]}).exec()
        .then( exchangeRates => {
                return exchangeRates;
            }
        )
    }
}