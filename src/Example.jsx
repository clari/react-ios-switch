import React from "react";

import Switch from "./Switch";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isColorSwitchChecked: true,
      isDisabledDragSwitchCheck: true,
      isLabelSwitchChecked: true,
      isStyleSwitchChecked: true,
      isSwitchChecked: true
    };
  }

  render() {
    const {
      isColorSwitchChecked,
      isDisabledDragSwitchCheck,
      isLabelSwitchChecked,
      isStyleSwitchChecked,
      isSwitchChecked
    } = this.state;

    return (
      <div style={{ margin: 50 }}>
        <div>
          <Switch
            checked={isSwitchChecked}
            onChange={checked =>
              this.setState({
                isSwitchChecked: checked
              })
            }
          />
        </div>
        <label
          style={{
            display: "block"
          }}
        >
          <Switch
            checked={isLabelSwitchChecked}
            onChange={checked =>
              this.setState({
                isLabelSwitchChecked: checked
              })
            }
          />
          Label
        </label>
        <div>
          <Switch checked disabled />
        </div>
        <div>
          <Switch checked readOnly />
        </div>
        <label
          style={{
            display: "block"
          }}
        >
          <Switch
            disableDrag
            checked={isDisabledDragSwitchCheck}
            onChange={checked =>
              this.setState({
                isDisabledDragSwitchCheck: checked
              })
            }
          />
          Drag disabled
        </label>
        <div>
          <Switch
            checked={isColorSwitchChecked}
            offColor="rgb(0, 122, 255)"
            onColor="rgb(255, 149, 0)"
            onChange={checked =>
              this.setState({
                isColorSwitchChecked: checked
              })
            }
          />
        </div>
        <div>
          <Switch
            checked={isStyleSwitchChecked}
            onChange={checked =>
              this.setState({
                isStyleSwitchChecked: checked
              })
            }
            style={{
              marginLeft: 50
            }}
          />
        </div>
      </div>
    );
  }
}
