"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const react_1 = require("react");
const ICryptoExchangeRate_1 = require("../../api/ICryptoExchangeRate");
const ExchangeRateProcesses_1 = require("./util/ExchangeRateProcesses");
const Currency_1 = require("../../api/Currency");
const appConfig = require("./config/appConfig");
const apiConfig = require("../../api/apiConfig");
const Graph_1 = require("./components/Graph");
const Table_1 = require("./components/Table");
const CoinSelect_1 = require("./components/CoinSelect");
class Root extends react_1.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.setState({ currentCoin: Currency_1.Currency.ETH, formattedExchangeRates: {} });
        if (appConfig.pollServerForExchangeRatesJob.shouldRun) {
            console.log("polling!");
            this.pollForUpToDateExchangeRates();
        }
        this.indexExchangeRates();
    }
    indexExchangeRates() {
        let url = `http://localhost:${apiConfig.port}${apiConfig.indexExchangeRatesPath}`;
        console.log("Getting up to date exchange rates");
        fetch(url).then(res => res.json()).then(rawExchangeRates => {
            return rawExchangeRates.map(ier => {
                return new ICryptoExchangeRate_1.ICryptoExchangeRate(new Date(ier.date), ier.source, ier.target, ier.rate, ier.apiName);
            }).filter(er => er.valid());
        }).then(exchangeRates => {
            let now = new Date();
            let then = new Date(now);
            then.setMinutes(now.getMinutes() - appConfig.minutesBackForExchangeRateGraphs * 1000);
            let formattedExchangeRates = ExchangeRateProcesses_1.ExchangeRateProcesses.formatExchangeRateHistory(then, now, exchangeRates);
            this.setState({ formattedExchangeRates: formattedExchangeRates });
        }).catch(err => {
            console.error("Exception while querying for most up to date exchange rates: " + err);
        });
    }
    pollForUpToDateExchangeRates() {
        setInterval(() => {
            this.indexExchangeRates();
            console.log("exchanges");
        }, appConfig.pollServerForExchangeRatesJob.runEvery * 1000);
    }
    selectCurrentCoin(currency) {
        this.setState({ currentCoin: currency });
    }
    allCoins() {
        return ExchangeRateProcesses_1.ExchangeRateProcesses.getCoinsInHistory(this.state.formattedExchangeRates);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(CoinSelect_1.CoinSelect, { allCoins: this.allCoins(), currentCoin: this.state.currentCoin, selectCurrentCoin: this.selectCurrentCoin.bind(this) }),
            React.createElement(Table_1.Table, { formattedExchangeRates: this.state.formattedExchangeRates, coins: ExchangeRateProcesses_1.ExchangeRateProcesses.getCoinsInHistory(this.state.formattedExchangeRates), currentCoin: this.state.currentCoin }),
            React.createElement(Graph_1.Graph, { formattedExchangeRates: this.state.formattedExchangeRates, coins: ExchangeRateProcesses_1.ExchangeRateProcesses.getCoinsInHistory(this.state.formattedExchangeRates), currentCoin: this.state.currentCoin })));
    }
}
react_dom_1.render(React.createElement(Root, null), document.getElementById('main'));
// componentWillMount
// render
// componentDidMount
//
// componentWillReceiveProps
// componentShouldUpdate
//# sourceMappingURL=index.js.map