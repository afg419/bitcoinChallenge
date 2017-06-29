import React, { Component } from 'react'
import { render } from 'react-dom'
import Graph from './components/graph/Graph'

class Root extends Component {
  constructor(){
    super();
    this.state = { apiResponse: "" };
  }

  componentDidMount() {
    fetch('https://api.icndb.com/jokes/random')
    .then(res  => {
      console.log(res)
      return res.json()
    })
    .then(body => {
        console.log(body)
        this.setState({ apiResponse: body.value })
    });
  }

  doSomething() {
    console.log('in do something')
  }

  render() {
    return (
      <Graph graphApiResponse={ this.state.apiResponse } handleClick={ this.doSomething }/>
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




