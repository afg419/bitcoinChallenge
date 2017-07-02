import * as React from 'react'
import { render } from 'react-dom'
import { Component } from "react";
import { ICrpytoExchangeRate } from "../../api/ICrpytoExchangeRate";
import { ExchangeRateProcesses } from "./util/ExchangeRateProcesses";
import { appConfig } from "./config/appConfig";
const apiConfig = require("../../api/apiConfig")

class Root extends Component {
  constructor(){
    super();
    this.state = { formattedExchangeRates: {} };
  }

  componentDidMount() {
      if(appConfig.pollServerForExchangeRatesJob.shouldRun){
          this.pollForUpToDateExchangeRates();
      }
  }

  indexExchangeRates(){
      let url = `http://localhost:${apiConfig.port}${apiConfig.indexExchangeRatesPath}`;
      console.log("Getting up to date exchange rates");
      return fetch(url).then(
          res => res.json()
      ).then(exchangeRates => {
          let now = new Date();
          let then = new Date(now);
          then.setMinutes(now.getMinutes() - appConfig.minutesBackForExchangeRateGraphs);

          let formattedExchangeRates : { [key:string]: { [key:string]: ICrpytoExchangeRate[]}; } = ExchangeRateProcesses.formatExchangeRateHistory(then, now, exchangeRates as ICrpytoExchangeRate[])
          this.setState({ formattedExchangeRates: formattedExchangeRates});
      }).catch( err => {
          console.error("Exception while querying for most up to date exchange rates: " + err);
      })
  }

  pollForUpToDateExchangeRates() {
    setTimeout(() => {
      this.indexExchangeRates();
    }, appConfig.pollServerForExchangeRatesJob.runEvery * 1000)
  }

  render() {
    return (
      <div>"YO"</div>
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




