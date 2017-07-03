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
var react_dom_1 = require("react-dom");
var react_1 = require("react");
var ICryptoExchangeRate_1 = require("../../api/ICryptoExchangeRate");
var ExchangeRateProcesses_1 = require("./util/ExchangeRateProcesses");
var Currency_1 = require("../../api/Currency");
var appConfig = require("./config/appConfig");
var apiConfig = require("../../api/apiConfig");
var Graph_1 = require("./components/Graph");
var Table_1 = require("./components/Table");
var Root = (function (_super) {
    __extends(Root, _super);
    function Root() {
        var _this = _super.call(this) || this;
        _this.state = { currentCoin: Currency_1.Currency.ETH };
        return _this;
    }
    Root.prototype.componentDidMount = function () {
        console.log(appConfig);
        if (appConfig.pollServerForExchangeRatesJob.shouldRun) {
            console.log("polling!");
            this.pollForUpToDateExchangeRates();
        }
        this.indexExchangeRates();
    };
    Root.prototype.indexExchangeRates = function () {
        var _this = this;
        var url = "http://localhost:" + apiConfig.port + apiConfig.indexExchangeRatesPath;
        console.log("Getting up to date exchange rates");
        return fetch(url).then(function (res) { return res.json(); }).then(function (rawExchangeRates) {
            return rawExchangeRates.map(function (ier) {
                return new ICryptoExchangeRate_1.ICryptoExchangeRate(new Date(ier.date), ier.source, ier.target, ier.rate, ier.apiName);
            }).filter(function (er) { return er.valid(); });
        }).then(function (exchangeRates) {
            var now = new Date();
            var then = new Date(now);
            then.setMinutes(now.getMinutes() - appConfig.minutesBackForExchangeRateGraphs * 1000);
            var formattedExchangeRates = ExchangeRateProcesses_1.ExchangeRateProcesses.formatExchangeRateHistory(then, now, exchangeRates);
            _this.setState({ formattedExchangeRates: formattedExchangeRates });
        })["catch"](function (err) {
            console.error("Exception while querying for most up to date exchange rates: " + err);
        });
    };
    Root.prototype.pollForUpToDateExchangeRates = function () {
        var _this = this;
        setInterval(function () {
            _this.indexExchangeRates();
            console.log("exchanges");
        }, appConfig.pollServerForExchangeRatesJob.runEvery * 1000);
    };
    Root.prototype.selectCurrentCoin = function (currency) {
        this.setState({ currentCoin: currency });
    };
    Root.prototype.render = function () {
        return (<div>
          <Table_1.Table formattedExchangeRates={this.state.formattedExchangeRates} coins={ExchangeRateProcesses_1.ExchangeRateProcesses.getCoinsInHistory(this.state.formattedExchangeRates)} apiNames={ExchangeRateProcesses_1.ExchangeRateProcesses.getApisInHistory(this.state.formattedExchangeRates)}/>
          <Graph_1.Graph formattedExchangeRates={this.state.formattedExchangeRates} coins={ExchangeRateProcesses_1.ExchangeRateProcesses.getCoinsInHistory(this.state.formattedExchangeRates)} apiNames={ExchangeRateProcesses_1.ExchangeRateProcesses.getApisInHistory(this.state.formattedExchangeRates)} currentCoin={this.state.currentCoin} selectCurrentCoin={this.selectCurrentCoin}/>
      </div>);
    };
    return Root;
}(react_1.Component));
react_dom_1.render(<Root />, document.getElementById('main'));
// componentWillMount
// render
// componentDidMount
//
// componentWillReceiveProps
// componentShouldUpdate
