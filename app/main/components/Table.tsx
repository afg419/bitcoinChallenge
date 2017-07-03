import * as React from 'react'
import { render } from 'react-dom'
import { Component } from "react";
import {Currency} from "../../../api/Currency";
import {TypeValidator} from "../../../api/TypeValidator";
import {ExchangeRateProcesses} from "../util/ExchangeRateProcesses";
import {CryptoExchangeRate} from "../models/CryptoExchangeRate";
import {isNullOrUndefined} from "util";
const apiConfig = require("../../../api/apiConfig");

export class Table extends Component {
    constructor(){
        super();
    }

    componentDidUpdate(){
        this.render()
    }

    apiRankingTable(){
        let toReturn = [];

        for(let coin of this.props.coins){
            toReturn.push(this.apiRankingRow(ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(this.props.formattedExchangeRates, coin), coin))
        }

        return <tbody>
            {toReturn}
        </tbody>
    }

    apiRankingRow(coinExchangeRates: CryptoExchangeRate[], currency: Currency){
        console.log(coinExchangeRates)
        return <tr key={currency}>
            <td>{Currency[currency]}</td>
            {this.apiRankingCell(coinExchangeRates[0])}
            {this.apiRankingCell(coinExchangeRates[1])}
            {this.apiRankingCell(coinExchangeRates[2])}
        </tr>
    }

    apiRankingCell(cryptoExchangeRate: CryptoExchangeRate){
        if(isNullOrUndefined(cryptoExchangeRate)){
            return "--"
        }
        return <td>{cryptoExchangeRate.apiName}: {cryptoExchangeRate.rate}</td>
    }

    getETHRankings(){
        return this.state.formattedExchangeRates;
    }

    getNum(){
    }

    getDSHRankings(){
        return this.props.formattedExchangeRates;
    }

    getLTCRankings(){
        return this.state.formattedExchangeRates;
    }


    render(){
        return (<div>
            <table className="game-board">
                {this.apiRankingTable()}
            </table>
        </div>)
    }
}
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