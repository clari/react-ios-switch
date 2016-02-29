import React from 'react';
import Switch from './Switch';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({
      checked,
    });
  }

  render() {
    const { className } = this.props;
    const { checked } = this.state;
    return (
      <div className={className}>
        <label>
          <Switch
            checked={checked}
            onChange={this.handleChange}
          />
          Search Engine Suggestions
        </label>
      </div>
    );
  }
}

export default App;
