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
var apiConfig = require("../../../api/apiConfig");
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        return _super.call(this) || this;
    }
    Table.prototype.componentDidUpdate = function () {
        this.render();
    };
    Table.prototype.apiRankingTable = function () {
        var toReturn = [];
        for (var _i = 0, _a = this.props.coins; _i < _a.length; _i++) {
            var coin = _a[_i];
            toReturn.push(this.apiRankingRow(ExchangeRateProcesses_1.ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(this.props.formattedExchangeRates, coin), coin));
        }
        return <tbody>
            {toReturn}
        </tbody>;
    };
    Table.prototype.apiRankingRow = function (coinExchangeRates, currency) {
        console.log(coinExchangeRates);
        return <tr key={currency}>
            <td>{Currency_1.Currency[currency]}</td>
            {this.apiRankingCell(coinExchangeRates[0])}
            {this.apiRankingCell(coinExchangeRates[1])}
            {this.apiRankingCell(coinExchangeRates[2])}
        </tr>;
    };
    Table.prototype.apiRankingCell = function (cryptoExchangeRate) {
        if (util_1.isNullOrUndefined(cryptoExchangeRate)) {
            return "--";
        }
        return <td>{cryptoExchangeRate.apiName}: {cryptoExchangeRate.rate}</td>;
    };
    Table.prototype.getETHRankings = function () {
        return this.state.formattedExchangeRates;
    };
    Table.prototype.getNum = function () {
    };
    Table.prototype.getDSHRankings = function () {
        return this.props.formattedExchangeRates;
    };
    Table.prototype.getLTCRankings = function () {
        return this.state.formattedExchangeRates;
    };
    Table.prototype.render = function () {
        return (<div>
            <table className="game-board">
                {this.apiRankingTable()}
            </table>
        </div>);
    };
    return Table;
}(react_1.Component));
exports.Table = Table;
//
// <tbody>
// <tr>
//     <td className={"cell-00"}>
//         <div>{this.getNum()}</div>
//     </td>
//     <td className={"cell-01"}>
//         <div>hey</div>
//     </td>
//     <td className={"cell-02"}>
//         <div>hey</div>
//     </td>
// </tr>
// <tr>
//     <td className={"cell-10"}>
//         <div>hey</div>
//     </td>
//     <td className={"cell-11"}>
//         <div>hey</div>
//     </td>
//     <td className={"cell-12"}>
//         <div>hey</div>
//     </td>
// </tr>
// <tr>
//     <td className={"cell-20"}>
//         <div>hey</div>
//     </td>
//     <td className={"cell-21"}>
//         <div>hey</div>
//     </td>
//     <td className={"cell-22"}>
//         <div>hey</div>
//     </td>
// </tr>
// </tbody> 
