import './App.css';
import React from 'react';

class UnitSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volumes: [],
      weights: [],
      lengths: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001/units');
    const json = await response.json();
    const unitsVolume = json.filter(unit => unit.unit_type_id === 1).map(unit => unit.unit_name);
    const unitsWeight = json.filter(unit => unit.unit_type_id === 3).map(unit => unit.unit_name);
    const unitsLength = json.filter(unit => unit.unit_type_id === 4).map(unit => unit.unit_name);
    this.setState({volumes: unitsVolume, weights: unitsWeight, lengths: unitsLength});
  }

  generateOptGroup = (unitType, units) => {
    return (
      <optgroup label={unitType}>
        {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
      </optgroup>
    );
  }

  render() {
    return (
      <div className='UnitField'>
        <input type='text' defaultValue={this.props.fromAmt}/>
        <select name='unitsFrom' id='unitsFrom'>
          {this.generateOptGroup('Volume', this.state.volumes)}
          {this.generateOptGroup('Weight', this.state.weights)}
          {this.generateOptGroup('Length', this.state.lengths)}
        </select>
      </div>
    );
  }
}

export default UnitSelector;