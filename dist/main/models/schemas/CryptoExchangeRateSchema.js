"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let CryptoExchangeRateSchema = new mongoose_1.Schema({
    date: Date,
    source: String,
    target: String,
    rate: Number,
    apiName: String
}, { timestamps: true });
exports.ExchangeDao = mongoose_1.model("CryptoExchangeRate", CryptoExchangeRateSchema);
//# sourceMappingURL=CryptoExchangeRateSchema.js.map