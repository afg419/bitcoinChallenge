"use strict";
exports.__esModule = true;
var TypeValidator_1 = require("./TypeValidator");
var ICryptoExchangeRate = (function () {
    function ICryptoExchangeRate(date, source, target, rate, apiName) {
        this.date = date;
        this.source = source;
        this.target = target;
        this.rate = rate;
        this.apiName = apiName;
    }
    ICryptoExchangeRate.prototype.valid = function () {
        return TypeValidator_1.TypeValidator.validDate(this.date) &&
            TypeValidator_1.TypeValidator.validCurrency(this.source) &&
            TypeValidator_1.TypeValidator.validCurrency(this.target) &&
            TypeValidator_1.TypeValidator.validNumber(this.rate) &&
            TypeValidator_1.TypeValidator.validString(this.apiName);
    };
    return ICryptoExchangeRate;
}());
exports.ICryptoExchangeRate = ICryptoExchangeRate;
