"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoExchangeRateSchema_1 = require("../../models/schemas/CryptoExchangeRateSchema");
const mongoose = require("mongoose");
class MongoDBClient {
    initializeDb(port, host) {
        mongoose.connection.on('error', function (err) {
            console.error('Mongoose default connection error: ' + err);
            process.exit(1);
        });
        mongoose.connection.on('open', function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`ready to accept connections on port ${port}`);
        });
        mongoose.connect(host);
    }
    createExchange(exchangeRate) {
        return CryptoExchangeRateSchema_1.CryptoExchangeRateDao.create(exchangeRate);
    }
    ;
    getExchangesBetween(startTime, endTime) {
        return CryptoExchangeRateSchema_1.CryptoExchangeRateDao.find({ $and: [{ date: { $lte: startTime } }, { date: { $gte: endTime } }] }).exec()
            .then(exchangeRates => {
            return exchangeRates;
        });
    }
    deleteExchangesOlderThan(startTime) {
        return CryptoExchangeRateSchema_1.CryptoExchangeRateDao.find({ $and: [{ date: { $lte: startTime } }] })
            .remove(exchangeRates => exchangeRates.remove()).exec();
    }
}
exports.MongoDBClient = MongoDBClient;
//# sourceMappingURL=MongoDBClient.js.map