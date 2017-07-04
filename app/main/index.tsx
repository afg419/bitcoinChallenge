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
  }

  componentWillMount(){
      this.setState({ currentCoin: Currency.ETH, formattedExchangeRates: {} }) ;
  }

  componentDidMount() {
      console.log(appConfig);
      if(appConfig.pollServerForExchangeRatesJob.shouldRun){
          console.log("polling!");
          this.pollForUpToDateExchangeRates();
      }
      this.indexExchangeRates();
  }

  indexExchangeRates(){
      let url = `http://localhost:${apiConfig.port}${apiConfig.indexExchangeRatesPath}`;
      console.log("Getting up to date exchange rates");
      return fetch(url).then(
          res => res.json()
      ).then(rawExchangeRates => {
          return rawExchangeRates.map( ier => {
                return new ICryptoExchangeRate (
                      new Date(ier.date), ier.source, ier.target, ier.rate, ier.apiName
                  )
              }
          ).filter(er => er.valid());
      }).then(exchangeRates => {
          let now = new Date();
          let then = new Date(now);
          then.setMinutes(now.getMinutes() - appConfig.minutesBackForExchangeRateGraphs*1000);

          let formattedExchangeRates : { [key:string]: { [key:string]: ICryptoExchangeRate[]}; } = ExchangeRateProcesses.formatExchangeRateHistory(then, now, exchangeRates as ICryptoExchangeRate[])

          this.setState({ formattedExchangeRates: formattedExchangeRates });
      }).catch( err => {
          console.error("Exception while querying for most up to date exchange rates: " + err);
      })
  }

  pollForUpToDateExchangeRates() {
    setInterval(() => {
      this.indexExchangeRates();
        console.log("exchanges")
    }, appConfig.pollServerForExchangeRatesJob.runEvery*1000)
  }

  selectCurrentCoin(currency: Currency ){
      this.setState({ currentCoin: currency })
  }


    private allCoins(){
        return ExchangeRateProcesses.getCoinsInHistory(this.state.formattedExchangeRates);
    }

    render() {
    return (
      <div>
          <CoinSelect
                allCoins={this.allCoins()}
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


// componentWillMount
// render
// componentDidMount
//
// componentWillReceiveProps
// componentShouldUpdate




