"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeValidator_1 = require("../util/TypeValidator");
class CryptoExchangeRate {
    constructor(date, source, target, rate, apiName) {
        this.date = date;
        this.source = source;
        this.target = target;
        this.rate = rate;
        this.apiName = apiName;
    }
    valid() {
        return TypeValidator_1.TypeValidator.validDate(this.date) &&
            TypeValidator_1.TypeValidator.validCurrency(this.source) &&
            TypeValidator_1.TypeValidator.validCurrency(this.target) &&
            TypeValidator_1.TypeValidator.validNumber(this.rate) &&
            TypeValidator_1.TypeValidator.validString(this.apiName);
    }
}
exports.CryptoExchangeRate = CryptoExchangeRate;
//# sourceMappingURL=CryptoExchangeRate.js.map