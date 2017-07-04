import * as React from 'react'
import { render } from 'react-dom'
import { Component } from "react";
import {Currency} from "../../../api/Currency";
import {TypeValidator} from "../../../api/TypeValidator";
import {ExchangeRateProcesses} from "../util/ExchangeRateProcesses";
import {isNullOrUndefined} from "util";
import {ICryptoExchangeRate} from "../../../api/ICryptoExchangeRate";
const apiConfig = require("../../../api/apiConfig");

export class Table extends Component {
    apiRankingTable(){
        let toReturn = [];

        for(let coin of this.props.coins){
            toReturn.push(this.apiRankingRow(ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(this.props.formattedExchangeRates, coin), coin))
        }

        return <tbody>
            {toReturn}
        </tbody>
    }

    apiRankingRow(coinExchangeRates: ICryptoExchangeRate[], currency: Currency){
        console.log(coinExchangeRates)
        return <ul key={currency}>
            {this.apiRankingCell(coinExchangeRates[0])}
            {this.apiRankingCell(coinExchangeRates[1])}
            {this.apiRankingCell(coinExchangeRates[2])}
        </ul>
    }

    apiRankingCell(cryptoExchangeRate: ICryptoExchangeRate){
        if(isNullOrUndefined(cryptoExchangeRate)){
            return "--"
        }
        return <li>{cryptoExchangeRate.apiName}: {cryptoExchangeRate.rate.toFixed(6)} {Currency[this.props.currentCoin]} per BTC </li>
    }

    render(){
        let {currentCoin} = this.props;
        return (<div>
            <h2>Exchange rates for BTC to { Currency[currentCoin] }</h2>
            <div className="rankings">
                {this.apiRankingRow(ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(this.props.formattedExchangeRates, currentCoin), currentCoin)}
            </div>
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