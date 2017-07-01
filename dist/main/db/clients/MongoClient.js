"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoExchangeRateSchema_1 = require("../../models/schemas/CryptoExchangeRateSchema");
const mongoose = require("mongoose");
class MongoClient {
    initializeDb(port, host) {
        mongoose.connection.on('error', function (err) {
            console.error('Mongoose default connection error: ' + err);
            process.exit(1);
        });
        mongoose.connection.on('open', function (err) {
            if (err) {
                console.error(err);
                // log.error('Mongoose default connection error: ' + err);
                process.exit(1);
            }
            console.log(`ready to accept connections on port ${port}`);
        });
        mongoose.connect(host);
    }
    create(exchangeRate) {
        return CryptoExchangeRateSchema_1.ExchangeDao.create(exchangeRate);
    }
    ;
}
exports.MongoClient = MongoClient;
//# sourceMappingURL=MongoClient.js.map