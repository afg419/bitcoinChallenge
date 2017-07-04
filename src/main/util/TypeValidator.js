"use strict";
exports.__esModule = true;
var Currency_1 = require("../../../api/Currency");
var util_1 = require("util");
var TypeValidator = (function () {
    function TypeValidator() {
    }
    TypeValidator.validDate = function (date) {
        if (util_1.isNullOrUndefined(date)) {
            return false;
        }
        return date instanceof Date;
    };
    TypeValidator.validCurrency = function (currency) {
        if (util_1.isNullOrUndefined(currency)) {
            return false;
        }
        return !util_1.isNullOrUndefined(Currency_1.Currency[currency]);
    };
    TypeValidator.validNumber = function (number) {
        if (util_1.isNullOrUndefined(number)) {
            return false;
        }
        if (isNaN(number)) {
            return false;
        }
        return typeof number == 'number';
    };
    TypeValidator.validString = function (string) {
        if (util_1.isNullOrUndefined(string)) {
            return false;
        }
        return typeof string == 'string';
    };
    return TypeValidator;
}());
exports.TypeValidator = TypeValidator;
