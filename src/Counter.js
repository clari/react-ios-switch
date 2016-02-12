import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { counter } = this.state;
    this.setState({
      counter: counter + 1
    });
  }

  render() {
    const { counter } = this.state;
    return <div>
      <button
        onClick={this.handleClick}
        type="button">
        Click me!
      </button>
      <div>
        {counter}
      </div>
    </div>;
  }
}

export default Counter;
