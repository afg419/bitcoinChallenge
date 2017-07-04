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
var react_chartjs_2_1 = require("react-chartjs-2");
var Currency_1 = require("../../../api/Currency");
var GraphColors_1 = require("../util/GraphColors");
var Graph = (function (_super) {
    __extends(Graph, _super);
    function Graph() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Graph.prototype.graphData = function () {
        var history = this.props.formattedExchangeRates;
        var dataToReturn = [];
        for (var apiName in history) {
            dataToReturn.push({
                label: apiName,
                data: history[apiName][this.props.currentCoin].map(function (er) {
                    return { x: er.date.toISOString(), y: er.rate };
                }),
                backgroundColor: "rgba(255,255,255,0)",
                borderColor: GraphColors_1.Color.toColor(apiName),
                lineTension: 0
            });
        }
        console.log(dataToReturn);
        return dataToReturn;
    };
    Graph.prototype._onSelect = function (it) {
        console.log(it);
    };
    Graph.prototype.render = function () {
        return <div>
            <react_chartjs_2_1.Line data={{
            // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: this.graphData()
        }} width={400} height={150} options={{
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
        }}/></div>;
    };
    return Graph;
}(react_1.Component));
exports.Graph = Graph;
