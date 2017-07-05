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

    activatedColor(currency: any){
        if(this.props.currentCoin.toString() === currency){
            return "lightblue";
        } else {
            return "blue";
        }
    }

    buttons(): any[]{
        let toReturn = [];
        for(let currency in this.props.allCoins){
            toReturn.push(
                <button
                    style={{backgroundColor: this.activatedColor(currency), color: "white", fontSize: 14}}
                    key={currency}
                    onClick={ () => this.props.selectCurrentCoin(currency) }>{Currency[currency]}
                </button>
            )
        }
        return toReturn;
    }

    render(){
        return <div>
            <h3>Select currency</h3>
            {this.buttons()}
        </div>
    }
}