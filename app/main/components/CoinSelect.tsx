import * as React from 'react'
import { render } from 'react-dom'
import { Component } from "react";
import {Currency} from "../../../api/Currency";
const apiConfig = require("../../../api/apiConfig");

export class CoinSelect extends Component {
    buttons(): any[]{
        let toReturn = [];
        for(let currency in this.props.allCoins){
            toReturn.push(<button key={currency} onClick={ () => this.props.selectCurrentCoin(currency) }>{Currency[currency]}</button>)
        }
        return toReturn;
    }

    render(){
        return <div>{this.buttons()}</div>
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