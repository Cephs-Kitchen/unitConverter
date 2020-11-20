import './App.css';
import React from 'react';
import UnitField from './UnitField';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromAmt: 0,
      toAmt: 0,
      units: [],
      fromUnits: [],
      toUnits: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001/units');
    const json = await response.json();
    this.setState({units: json, fromUnits: json, toUnits: json});
  }

  handleUpdateUnit = (e) => {
    const unitName = e.target.value;
    const selectedUnit = this.state.units.find(unit => unit.unit_name === unitName);
    const toUnits = this.state.units.filter(unit => unit.unit_type_id === selectedUnit.unit_type_id);
    // update the unitType to match selected unit
    this.setState({toUnits: toUnits});
  }

  render() {
    return (
      <div className="App-header">
        <h1>Unit Converter</h1>
        <div className='UnitConverter'>
          <UnitField fromAmt={this.state.fromAmt} units={this.state.fromUnits} onChange={this.handleUpdateUnit}/>
          &#x021c4;
          <UnitField fromAmt={this.state.toAmt} units={this.state.toUnits}/>
        </div>
      </div>
    );
  }
}

export default App;