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
var apiConfig = require('../../api/apiConfig');
var Root = (function (_super) {
    __extends(Root, _super);
    function Root() {
        var _this = _super.call(this) || this;
        _this.state = { exchangeRates: [] };
        return _this;
    }
    Root.prototype.componentDidMount = function () {
        this.pollForUpToDateExchangeRates();
    };
    Root.prototype.indexExchangeRates = function () {
        var _this = this;
        var url = "http://localhost:" + apiConfig.port + apiConfig.indexExchangeRatesPath;
        console.log("Getting up to date exchange rates");
        return fetch(url).then(function (res) { return res.json(); }).then(function (exchangeRates) {
            _this.setState({ exchangeRates: exchangeRates });
        })["catch"](function (err) {
            console.error("Exception while querying for most up to date exchange rates: " + err);
        });
    };
    Root.prototype.pollForUpToDateExchangeRates = function () {
        var _this = this;
        setTimeout(function () {
            _this.indexExchangeRates();
        }, 1000);
    };
    Root.prototype.render = function () {
        return (<div>"YO"</div>);
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
