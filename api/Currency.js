"use strict";
exports.__esModule = true;
var Currency;
(function (Currency) {
    Currency[Currency["ETH"] = 0] = "ETH";
    Currency[Currency["DSH"] = 1] = "DSH";
    Currency[Currency["LTC"] = 2] = "LTC";
    Currency[Currency["BTC"] = 3] = "BTC";
})(Currency = exports.Currency || (exports.Currency = {}));
exports.currencyExchangeRates = {
    ETH: [],
    DSH: [],
    LTC: [],
    BTC: []
};
