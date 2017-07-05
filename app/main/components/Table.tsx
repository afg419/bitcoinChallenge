import * as React from 'react'
import { render } from 'react-dom'
import { Component } from "react";
import {Currency} from "../../../api/Currency";
import {TypeValidator} from "../../../api/TypeValidator";
import {ExchangeRateProcesses} from "../util/ExchangeRateProcesses";
import {isNullOrUndefined} from "util";
import {ICryptoExchangeRate} from "../../../api/ICryptoExchangeRate";

interface TableProps {
    formattedExchangeRates: any
    coins: Currency[]
    currentCoin: Currency
}

export class Table extends Component<TableProps, {}> {
    constructor(){
        super()
    }

    apiRankingRow(coinExchangeRates: ICryptoExchangeRate[], currency: Currency){
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
            <h4>Current exchanges rates</h4>
            <div className="rankings">
                {this.apiRankingRow(ExchangeRateProcesses.getApisForTargetCurrencyInOrderOfPerformance(this.props.formattedExchangeRates, currentCoin), currentCoin)}
            </div>
        </div>)
    }
}