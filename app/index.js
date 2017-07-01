import React, { Component } from 'react'
import { render } from 'react-dom'
import Graph from './components/graph/Graph'
let apiConfig = require('../api/apiConfig')

class Root extends Component {
  constructor(){
    super();
    this.state = { exchangeRates: [] };
  }

  componentDidMount() {
    this.pollForUpToDateExchangeRates();
  }

  indexExchangeRates(){
      let url = `http://localhost:${apiConfig.port}${apiConfig.indexExchangeRatesPath}`;
      console.log("Getting up to date exchange rates")
      return fetch(url).then(
          res => res.json()
      ).then(exchangeRates => {
          this.setState({ exchangeRates: exchangeRates});
      }).catch( err => {
          console.error("Exception while querying for most up to date exchange rates: " + err);
      })
  }

  pollForUpToDateExchangeRates() {
    setTimeout(() => {
      this.indexExchangeRates();
    }, 1000)
  }



  render() {
    return (
      <div>"YO"</div>
      // <Graph graphApiResponse={ this.state.apiResponse } handleClick={ this.doSomething }/>
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




