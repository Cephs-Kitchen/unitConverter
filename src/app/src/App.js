import './App.css';
import React from 'react';
import UnitField from './UnitField';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromAmt: 0,
      toAmt: 0,
      curFromUnit: [],
      curToUnit: [],
      units: [],
      fromUnits: [],
      toUnits: []
    }
  }

  async componentDidMount() {
    // fetch all units from database
    const response = await fetch('http://localhost:3001/units');
    const json = await response.json();
    // unit at index zero will always show first, so set it as selected
    const initialFromUnit = json[0];
    // ensure the toUnits match what has been "selected" at init-time
    const toUnits = json.filter(unit => unit.unit_type_id === initialFromUnit.unit_type_id);
    const initialToUnit = toUnits[0];
    this.setState({curFromUnit: initialFromUnit, curToUnit: initialToUnit, units: json, fromUnits: json, toUnits: toUnits});
  }

  handleFromUnitSelection = (e) => {
    // update the toUnits that will be shown
    const unitName = e.target.value;
    const selectedUnit = this.state.units.find(unit => unit.unit_name === unitName);
    const toUnits = this.state.units.filter(unit => unit.unit_type_id === selectedUnit.unit_type_id);
    this.setState({curFromUnit: selectedUnit, toUnits: toUnits});
  }

  handleToUnitSelection = (e) => {
    // update which unit is selected to convert to
    const unitName = e.target.value;
    const selectedUnit = this.state.units.find(unit => unit.unit_name === unitName);
    this.setState({curToUnit: selectedUnit});
  }

  _getConvertedValue = (input, inputIsFromUnit) => {
    let startEqv, endEqv;
    if (inputIsFromUnit) {
      startEqv = this.state.curFromUnit.unit_base_equivalent;
      endEqv = this.state.curToUnit.unit_base_equivalent;
    } else {
      startEqv = this.state.curToUnit.unit_base_equivalent;
      endEqv = this.state.curFromUnit.unit_base_equivalent;
    }
    // multiply input by startEqv to convert to base_equivalent
    const interimValue = input * startEqv;
    // then divide by endEqv to convert back into a regular unit
    const convertedInput = interimValue / endEqv;
    return convertedInput;
  }

  // this function is essentially identical to handleUpdateInputTo,
  // except that it assumes "input" originates from the fromUnit
  handleUpdateInputFrom = (e) => {
    let input = e.target.value;
    // if input is invalid, input will be an empty string
    if (input.length > 0) {
      input = Number(input);
      const convertedInput = this._getConvertedValue(input, true);
      this.setState({fromAmt: input, toAmt: convertedInput});
    }
  }

  // this function is essentially identical to handleUpdateInputFrom,
  // except that it assumes "input" originates from the toUnit
  handleUpdateInputTo = (e) => {
    let input = e.target.value;
    // if input is invalid, input will be an empty string
    if (input.length > 0) {
      input = Number(input);
      const convertedInput = this._getConvertedValue(input, false);
      this.setState({fromAmt: convertedInput, toAmt: input});
    }
  }

  render() {
    return (
      <div className="App-header">
        <h1>Unit Converter</h1>
        <div className='UnitConverter'>
          <UnitField amt={this.state.fromAmt} units={this.state.fromUnits} onUnitChange={this.handleFromUnitSelection} onInputChange={this.handleUpdateInputFrom}/>
          &#x021c4;
          <UnitField amt={this.state.toAmt} units={this.state.toUnits} onUnitChange={this.handleToUnitSelection} onInputChange={this.handleUpdateInputTo}/>
        </div>
      </div>
    );
  }
}

export default App;