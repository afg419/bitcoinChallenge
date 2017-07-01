"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Currency_1 = require("../core/Currency");
const util_1 = require("util");
class TypeValidator {
    static validDate(date) {
        if (util_1.isNullOrUndefined(date)) {
            return false;
        }
        return date instanceof Date;
    }
    static validCurrency(currency) {
        if (util_1.isNullOrUndefined(currency)) {
            return false;
        }
        return !util_1.isNullOrUndefined(Currency_1.Currency[currency]);
    }
    static validNumber(number) {
        if (util_1.isNullOrUndefined(number)) {
            return false;
        }
        if (isNaN(number)) {
            return false;
        }
        return typeof number == 'number';
    }
    static validString(string) {
        if (util_1.isNullOrUndefined(string)) {
            return false;
        }
        return typeof string == 'string';
    }
}
exports.TypeValidator = TypeValidator;
//# sourceMappingURL=TypeValidator.js.map