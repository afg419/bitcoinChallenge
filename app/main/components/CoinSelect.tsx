import * as React from 'react'
import { render } from 'react-dom'
import { Component } from "react";
import {Currency} from "../../../api/Currency";
const apiConfig = require("../../../api/apiConfig");

interface CoinSelectProps {
    allCoins: Currency[]
    currentCoin: Currency
    selectCurrentCoin:any
}

export class CoinSelect extends Component<CoinSelectProps, {}> {
    constructor(){
        super()
    }

    buttons(): any[]{
        let toReturn = [];
        for(let currency in this.props.allCoins){
            toReturn.push(
                <button
                    key={currency}
                    onClick={ () => this.props.selectCurrentCoin(currency) }>{Currency[currency]}
                </button>
            )
        }
        return toReturn;
    }

    render(){
        return <div>{this.buttons()}</div>
    }
}