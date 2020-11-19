import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromAmt: 0,
      toAmt: 0,
      unitType: 1,
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Unit Converter
        </header>
        <input type='text' defaultValue={this.state.fromAmt}/>
      </div>
    );
  }
}

export default App;
