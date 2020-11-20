import './App.css';
import React from 'react';
import UnitField from './UnitField';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromAmt: 0,
      toAmt: 0,
      unitType: 1,
      fromUnits: [],
      toUnits: []
    }
  }

  render() {
    return (
      <div className="App-header">
        <h1>Unit Converter</h1>
        <div className='UnitConverter'>
          <UnitField fromAmt={this.state.fromAmt}/>
          &#x021c4;
          <UnitField fromAmt={this.state.toAmt}/>
        </div>
      </div>
    );
  }
}

export default App;