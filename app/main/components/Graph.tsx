import * as React from 'react'
import { render } from 'react-dom'
import { Component } from "react";
import {Line} from 'react-chartjs-2';
import {Currency} from "../../../api/Currency";
import {Color} from "../util/GraphColors";

interface GraphProps {
    formattedExchangeRates: any
    coins: Currency[]
    currentCoin: Currency
}

export class Graph extends Component<GraphProps, {}> {
    constructor(){
        super()
    }

    private graphData(): any[]{
        let history = this.props.formattedExchangeRates;
        let dataToReturn = [];
        for( let apiName in history ){
            dataToReturn.push({
                label: apiName,
                data: history[apiName][this.props.currentCoin].map( er => {
                    return {x: er.date.toISOString(), y: er.rate }
                }),
                backgroundColor: "rgba(255,255,255,0)",
                borderColor: Color.toColor(apiName),
                lineTension: 0
            })
        }
        console.log(dataToReturn)
        return dataToReturn;
    }

    private _onSelect(it){
        console.log(it);
    }

    render(){
        return <div>
            <Line
                data={{
                    datasets: this.graphData(),
                }}
                width={400}
                height={120}
                options={
                    {
                        responsive: true,
                        title:{
                            display:true,
                            text:"BTC vs " + Currency[this.props.currentCoin]
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
                    }
                }
        /></div>
    }
}