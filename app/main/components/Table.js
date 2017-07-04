"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const Currency_1 = require("../../../api/Currency");
const ExchangeRateProcesses_1 = require("../util/ExchangeRateProcesses");
const util_1 = require("util");
class Table extends react_1.Component {
    constructor() {
        super();
    }
    apiRankingRow(coinExchangeRates, currency) {
        return React.createElement("ul", { key: currency },
            this.apiRankingCell(coinExchangeRates[0]),
            this.apiRankingCell(coinExchangeRates[1]),
            this.apiRankingCell(coinExchangeRates[2]));
    }
    apiRankingCell(cryptoExchangeRate) {
        if (util_1.isNullOrUndefined(cryptoExchangeRate)) {
            return "--";
        }
        return React.createElement("li", null,
            cryptoExchangeRate.apiName,
            ": ",
            cryptoExchangeRate.rate.toFixed(6),
            " ",
            Currency_1.Currency[this.props.currentCoin],
            " per BTC ");
    }
    render() {
        let { currentCoin } = this.props;
        return (React.createElement("div", null,
            React.createElement("h2", null,
                "Exchange rates for BTC to ",
                Currency_1.Currency[currentCoin]),
            React.createElement("div", { className: "rankings" }, this.apiRankingRow(ExchangeRateProcesses_1.ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(this.props.formattedExchangeRates, currentCoin), currentCoin))));
    }
}
exports.Table = Table;
//# sourceMappingURL=Table.js.map