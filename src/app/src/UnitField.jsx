import './App.css';
import React from 'react';

class UnitSelector extends React.Component {
  generateOption = (unit) => {
    const name = unit.unit_name;
    return (
      <option key={name} value={name}>{name}</option>
    );
  }

  generateOptGroups = (units, unitTypeName) => {
    // if all types requested
    if (units.length > 0) {
      return (
        <optgroup label={unitTypeName}>
          {units.map(unit => this.generateOption(unit))}
        </optgroup>
      );
    }
  }

  generateSelect = (units, onChangeFunc) => {
    const volumes = units.filter(unit => unit.unit_type_id === 1);
    const weights = units.filter(unit => unit.unit_type_id === 3);
    const lengths = units.filter(unit => unit.unit_type_id === 4);

    const volumeOptGroup = this.generateOptGroups(volumes, 'Volume');
    const weightOptGroup = this.generateOptGroups(weights, 'Weight');
    const lengthOptGroup = this.generateOptGroups(lengths, 'Length');
    return(
      <select name='unitsFrom' id='unitsFrom' onChange={onChangeFunc}>
        {volumeOptGroup}
        {weightOptGroup}
        {lengthOptGroup}
      </select>
    );
  }

  render() {
    return (
      <form className='UnitField' >
        <input type='text' defaultValue={this.props.fromAmt}/>
        {this.generateSelect(this.props.units, this.props.onChange)}
      </form>
    );
  }
}

export default UnitSelector;