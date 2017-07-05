"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const react_chartjs_2_1 = require("react-chartjs-2");
const Currency_1 = require("../../../api/Currency");
const GraphColors_1 = require("../util/GraphColors");
class Graph extends react_1.Component {
    constructor() {
        super();
    }
    graphData() {
        let history = this.props.formattedExchangeRates;
        let dataToReturn = [];
        for (let apiName in history) {
            dataToReturn.push({
                label: apiName,
                data: history[apiName][this.props.currentCoin].map(er => {
                    return { x: er.date.toISOString(), y: er.rate };
                }),
                backgroundColor: "rgba(255,255,255,0)",
                borderColor: GraphColors_1.Color.toColor(apiName),
                lineTension: 0
            });
        }
        console.log(dataToReturn);
        return dataToReturn;
    }
    _onSelect(it) {
        console.log(it);
    }
    render() {
        return React.createElement("div", null,
            React.createElement(react_chartjs_2_1.Line, { data: {
                    datasets: this.graphData(),
                }, width: 400, height: 120, options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: "BTC vs " + Currency_1.Currency[this.props.currentCoin]
                    },
                    scales: {
                        xAxes: [{
                                type: "time",
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Date'
                                },
                                ticks: {
                                    major: {
                                        fontStyle: "bold",
                                        fontColor: "#FF0000"
                                    }
                                }
                            }],
                        yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'value'
                                }
                            }]
                    }
                } }));
    }
}
exports.Graph = Graph;
//# sourceMappingURL=Graph.js.map