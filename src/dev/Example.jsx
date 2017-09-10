import React from 'react';

import Switch from '../lib/Switch';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      checked: true,
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange({ checked }) {
    this.setState({ checked });
  }
  
  render() {
    const { checked } = this.state;
    
    return (
      <div
        style={{ margin: 50 }}
      >
        <label>
          <Switch
            checked={checked}
            onChange={this.handleChange}
          />
          Setting
        </label>
      </div>
    );
  }
}
