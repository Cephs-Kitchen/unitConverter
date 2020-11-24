import './style/App.css';
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
    // reset toUnit if a new unit type is selected
    let newToUnit;
    if (toUnits.includes(this.state.curToUnit)) {
      newToUnit = this.state.curToUnit;
    } else {
      newToUnit = toUnits[0];
    }

    // update values in input fields to match new units
    let newToAmt = this._getConvertedValue(this.state.fromAmt, true, selectedUnit.unit_base_equivalent, newToUnit.unit_base_equivalent);
    newToAmt = this._roundValue(newToAmt);

    this.setState({toAmt: newToAmt, curFromUnit: selectedUnit, curToUnit: newToUnit, toUnits: toUnits});
  }

  handleToUnitSelection = (e) => {
    // update which unit is selected to convert to
    const unitName = e.target.value;
    const selectedUnit = this.state.units.find(unit => unit.unit_name === unitName);

    // update values in input fields to match new units
    let newToAmt = this._getConvertedValue(this.state.fromAmt, true, this.state.curFromUnit.unit_base_equivalent, selectedUnit.unit_base_equivalent);
    newToAmt = this._roundValue(newToAmt);

    this.setState({toAmt: newToAmt, curToUnit: selectedUnit});
  }

  // this function is essentially identical to handleUpdateInputTo,
  // except that it assumes "input" originates from the fromUnit
  handleUpdateInputFrom = (e) => {
    let input = e.target.value;
    // if input is invalid, input will be an empty string
    if (input.length > 0) {
      input = Number(input);
      let convertedInput = this._getConvertedValue(input, true);
      // truncate both values to 2 decimals
      input = this._roundValue(input);
      convertedInput = this._roundValue(convertedInput);
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
      let convertedInput = this._getConvertedValue(input, false);
      // truncate both values to 2 decimals
      input = this._roundValue(input);
      convertedInput = this._roundValue(convertedInput);
      this.setState({fromAmt: convertedInput, toAmt: input});
    }
  }

  _getConvertedValue = (input,
                        inputIsFromUnit,
                        fromEqv=this.state.curFromUnit.unit_base_equivalent,
                        toEqv=this.state.curToUnit.unit_base_equivalent) =>
  {
    let startEqv, endEqv;
    if (inputIsFromUnit) {
      startEqv = fromEqv;
      endEqv = toEqv;
    } else {
      startEqv = toEqv;
      endEqv = fromEqv;
    }
    // multiply input by startEqv to convert to base_equivalent
    const interimValue = input * startEqv;
    // then divide by endEqv to convert back into a regular unit
    const convertedInput = interimValue / endEqv;
    return convertedInput;
  }

  _roundValue = (value) => {
    // round to two decimal places.
    // Change the roundingConstant by magnitudes of 10 to adjust.
    // Bigger = more decimals, smaller = less decimals
    const roundingConst = 100;
    return Math.round((value + Number.EPSILON) * roundingConst) / roundingConst;
  }

  render() {
    return (
      <div className="App-header container">
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