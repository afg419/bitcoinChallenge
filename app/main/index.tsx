import * as React from 'react'
import { render } from 'react-dom'
import { Component } from "react";
import { ICryptoExchangeRate } from "../../api/ICryptoExchangeRate";
import { ExchangeRateProcesses } from "./util/ExchangeRateProcesses";
import { CryptoExchangeRate } from "./models/CryptoExchangeRate";
import {Currency} from "../../api/Currency";
const appConfig =  require("./config/appConfig");
const apiConfig = require("../../api/apiConfig");
import {Graph} from "./components/Graph";
import {Table} from "./components/Table";
import {TypeValidator} from "../../api/TypeValidator";

class Root extends Component {
  constructor(){
    super();
    this.state = { formattedExchangeRates: {} };
  }

  componentDidMount() {
      console.log(appConfig);
      if(appConfig.pollServerForExchangeRatesJob.shouldRun){
          console.log("polling!");
          this.pollForUpToDateExchangeRates();
      }
  }

  indexExchangeRates(){
      let url = `http://localhost:${apiConfig.port}${apiConfig.indexExchangeRatesPath}`;
      console.log("Getting up to date exchange rates");
      return fetch(url).then(
          res => res.json()
      ).then(rawExchangeRates => {
          return rawExchangeRates.map( ier => {
                return new CryptoExchangeRate(
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

  render() {
    return (
      <div>
          <Graph formattedExchangeRates={ this.state.formattedExchangeRates }/>
          <Table formattedExchangeRates={ this.state.formattedExchangeRates }/>
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




