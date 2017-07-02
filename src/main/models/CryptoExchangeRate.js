"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ICryptoExchangeRate_1 = require("../../../api/ICryptoExchangeRate");
class CryptoExchangeRate extends ICryptoExchangeRate_1.ICryptoExchangeRate {
    constructor(date, source, target, rate, apiName) {
        super(date, source, target, rate, apiName);
    }
}
exports.CryptoExchangeRate = CryptoExchangeRate;
//# sourceMappingURL=CryptoExchangeRate.js.map