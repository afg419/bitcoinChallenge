import * as React from 'react'
import { render } from 'react-dom'
import { Component } from "react";
import { ICryptoExchangeRate } from "../../api/ICryptoExchangeRate";
import { ExchangeRateProcesses } from "./util/ExchangeRateProcesses";
import {Currency} from "../../api/Currency";
const appConfig =  require("./config/appConfig");
const apiConfig = require("../../api/apiConfig");
import {Graph} from "./components/Graph";
import {Table} from "./components/Table";
import {CoinSelect} from "./components/CoinSelect";

interface RootState {
    currentCoin: Currency
    formattedExchangeRates: any
}

class Root extends Component<{}, RootState> {
    constructor(){
        super();
        this.state = ({ currentCoin: Currency.ETH, formattedExchangeRates: {} }) ;
    }

    componentDidMount(): void {
        if(appConfig.pollServerForExchangeRatesJob.shouldRun){
          console.log("polling!");
          this.pollForUpToDateExchangeRates();
        }
        this.indexExchangeRates();
    }

    indexExchangeRates(): void {
        let url = `${apiConfig.indexExchangeRatesPath}`;
        fetch(url)
        .then(res => res.json())
        .then(rawExchangeRates => this.formValidExchanges(rawExchangeRates))
        .then( validExchanges => this.filterExchangesByConfigValues(validExchanges))
        .then(exchangeRates => {
              let now = new Date();
              let then = new Date(now);
              then.setMinutes(now.getMinutes() - appConfig.minutesBackForExchangeRateGraphs*1000);

              let formattedExchangeRates : { [key:string]: { [key:string]: ICryptoExchangeRate[]}; } = ExchangeRateProcesses.formatExchangeRateHistory(then, now, exchangeRates as ICryptoExchangeRate[])

              this.setState({ formattedExchangeRates: formattedExchangeRates });
        }).catch( err => {
          console.error("Exception while querying for most up to date exchange rates: " + err);
        })
    }

    private formValidExchanges(rawExchangeRates: any[]): ICryptoExchangeRate[] {
        return rawExchangeRates.map( ier => {
            return new ICryptoExchangeRate (
                new Date(ier.date), ier.source, ier.target, ier.rate, ier.apiName
            )
        }).filter(er => er.valid())
    }

    private filterExchangesByConfigValues(exchanges: ICryptoExchangeRate[]): ICryptoExchangeRate[] {
        return exchanges
            .filter( er => appConfig.targetCoins.indexOf(parseInt(er.target.toString())) > -1)
            .filter( er => appConfig.apiNames.indexOf(er.apiName) > -1)
    }

    private pollForUpToDateExchangeRates(): void {
        setInterval(() => {
          this.indexExchangeRates();
            console.log("exchanges")
        }, appConfig.pollServerForExchangeRatesJob.runEvery*1000)
    }

    private selectCurrentCoin(currency: Currency ): void {
        this.setState({ currentCoin: currency })
    }

    render() {
        return (
          <div style={{marginLeft: "15px", marginRight: "15px"}}>
              <h1 style={{textAlign: "center"}}>Bitcoin Exchange Rate Tracker (BTC vs {Currency[this.state.currentCoin]})</h1>
              <CoinSelect
                    allCoins={ExchangeRateProcesses.getCoinsInHistory(this.state.formattedExchangeRates)}
                    currentCoin={this.state.currentCoin}
                    selectCurrentCoin={ this.selectCurrentCoin.bind(this) }
              />

              <Table
                    formattedExchangeRates={ this.state.formattedExchangeRates }
                     coins={ ExchangeRateProcesses.getCoinsInHistory(this.state.formattedExchangeRates)}
                     currentCoin={ this.state.currentCoin }
              />

              <Graph
                    formattedExchangeRates={ this.state.formattedExchangeRates }
                     coins={ ExchangeRateProcesses.getCoinsInHistory(this.state.formattedExchangeRates)}
                     currentCoin={ this.state.currentCoin }
                     />
          </div>
        )
  }
}

render(<Root />, document.getElementById('main'))

