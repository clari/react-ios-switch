import React from 'react';
import Switch from './Switch';

class App extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <label>
          <Switch/>
          Search Engine Suggestions
        </label>
      </div>
    );
  }
}

export default App;
