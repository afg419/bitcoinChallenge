"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var react_1 = require("react");
var Currency_1 = require("../../../api/Currency");
var ExchangeRateProcesses_1 = require("../util/ExchangeRateProcesses");
var util_1 = require("util");
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        return _super.call(this) || this;
    }
    Table.prototype.apiRankingRow = function (coinExchangeRates, currency) {
        console.log(coinExchangeRates);
        return <ul key={currency}>
            {this.apiRankingCell(coinExchangeRates[0])}
            {this.apiRankingCell(coinExchangeRates[1])}
            {this.apiRankingCell(coinExchangeRates[2])}
        </ul>;
    };
    Table.prototype.apiRankingCell = function (cryptoExchangeRate) {
        if (util_1.isNullOrUndefined(cryptoExchangeRate)) {
            return "--";
        }
        return <li>{cryptoExchangeRate.apiName}: {cryptoExchangeRate.rate.toFixed(6)} {Currency_1.Currency[this.props.currentCoin]} per BTC </li>;
    };
    Table.prototype.render = function () {
        var currentCoin = this.props.currentCoin;
        return (<div>
            <h2>Exchange rates for BTC to {Currency_1.Currency[currentCoin]}</h2>
            <div className="rankings">
                {this.apiRankingRow(ExchangeRateProcesses_1.ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(this.props.formattedExchangeRates, currentCoin), currentCoin)}
            </div>
        </div>);
    };
    return Table;
}(react_1.Component));
exports.Table = Table;
