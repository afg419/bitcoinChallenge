import * as React from 'react'
import { render } from 'react-dom'
import { Component } from "react";
import {ExchangeRateProcesses} from "../util/ExchangeRateProcesses";
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import {Currency} from "../../../api/Currency";
import {Color} from "../util/GraphColors";

const Dropdown = require('react-simple-dropdown');``
const DropdownTrigger = Dropdown.DropdownTrigger;``
const DropdownContent = Dropdown.DropdownContent;``


export class Graph extends Component {
    currentData(){
        return ExchangeRateProcesses.getCoinHistoryByApi(this.props.currentCoin, this.props.formattedExchangeRates);
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
                // fillColor: "rgba(0, 0, 0, 1)"
                borderColor: Color.toColor(apiName)
            })
        }
        console.log(dataToReturn)
        return dataToReturn;
    }

    private dropDown(): any {
        return <Dropdown>
            <DropdownTrigger>Profile</DropdownTrigger>
            <DropdownContent>
                <ul>
                    <li>
                        <a href="/profile">BTC</a>
                    </li>
                    <li>
                        <a href="/favorites">Favorites</a>
                    </li>
                    <li>
                        <a href="/logout">Log Out</a>
                    </li>
                </ul>
            </DropdownContent>
        </Dropdown>
    }

    render(){
        return <div>
            <Line
                data={{
                    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: this.graphData(),
                }}
                width={400}
                height={150}
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