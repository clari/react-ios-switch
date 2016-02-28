// TODO
// Distracting animation on the green side. The area to the left of the handle should always be
// hidden.
// Edge case when right click inspect element on switch. The mouseup event never fires.
// Externalize checked as prop. Handle checked received prop.

import dynamics from 'dynamics.js';
import { interpolate } from 'd3-interpolate';
import classNames from 'classnames';
import React from 'react';
import styles from './Switch.scss';

class Switch extends React.Component {
  static defaultProps = {
    disabled: false,
    handleColor: 'white',
    maxOffset: 20,
    offColor: 'white',
    onColor: '#4cd964',
    pendingOffColor: '#e5e5e5',
  };

  constructor(props) {
    super(props);

    const offset = 0;

    this.state = {
      checked: false,
      currentClientX: 0,
      dragging: false,
      offset,
      startClientX: 0,
    };

    this.animatedProperties = {
      offset,
    };

    this.handleAnimationChange = this.handleAnimationChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHandleClick = this.handleHandleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentWillUnmount() {
    const { dragging } = this.state;
    this.cancelAnimation();
    if (dragging) {
      this.removeListeners();
    }
  }

  addListeners() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  cancelAnimation() {
    dynamics.stop(this.animatedProperties);
  }

  handleAnimationChange() {
    this.setState({
      offset: this.animatedProperties.offset,
    });
  }

  handleClick(e) {
    const { checked } = this.state;
    e.preventDefault();
    this.setState({
      checked: !checked,
    }, () => this.startAnimation());
  }

  handleHandleClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleInputChange() {
  }

  handleMouseDown(e) {
    this.cancelAnimation();
    this.setState({
      currentClientX: e.clientX,
      dragging: true,
      startClientX: e.clientX,
    });
    this.addListeners();
  }

  handleMouseMove(e) {
    this.setState({
      currentClientX: e.clientX,
    });
  }

  handleMouseUp() {
    const { maxOffset } = this.props;
    const { checked, currentClientX, offset, startClientX } = this.state;
    this.removeListeners();

    const deltaX = currentClientX - startClientX;
    if (!deltaX) {
      this.setState({
        checked: !checked,
        dragging: false,
      }, () => this.startAnimation());
      return;
    }

    const newOffset = offset + deltaX;
    const newChecked = newOffset > maxOffset / 2;

    this.setState({
      checked: newChecked,
      dragging: false,
      offset: newOffset,
    }, () => this.startAnimation());
  }

  removeListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  startAnimation() {
    const { maxOffset } = this.props;
    const { checked, offset } = this.state;
    const desiredOffset = checked ? maxOffset : 0;
    this.animatedProperties.offset = offset;
    dynamics.animate(this.animatedProperties, {
      offset: desiredOffset,
    }, {
      change: this.handleAnimationChange,
      frequency: 200,
      friction: 400,
      type: dynamics.spring,
    });
  }

  render() {
    const { disabled, handleColor, maxOffset, offColor, onColor, pendingOffColor } = this.props;
    const { checked, currentClientX, dragging, offset, startClientX } = this.state;

    const deltaX = dragging ? currentClientX - startClientX : 0;
    const clampedOffset = Math.min(maxOffset, Math.max(0, offset + deltaX));
    const transform = `translateX(${clampedOffset}px)`;

    const t = clampedOffset / maxOffset;
    const color = interpolate(pendingOffColor, onColor)(t);

    return (
      <div
        className={classNames(
          styles.switch,
          checked && styles['switch--checked'],
          dragging && styles['switch--dragging'],
          disabled && styles['switch--disabled']
        )}
        onClick={this.handleClick}
        style={{
          backgroundColor: color,
        }}
      >
        <div
          className={styles.offState}
          style={{
            backgroundColor: offColor,
          }}
        />
        <div
          className={styles.handle}
          onClick={this.handleHandleClick}
          onMouseDown={!disabled && this.handleMouseDown}
          style={{
            backgroundColor: handleColor,
            msTransform: transform,
            transform,
            WebkitTransform: transform,
          }}
        />
        <input
          className={styles.input}
          checked={checked}
          disabled={disabled}
          onChange={this.handleInputChange}
          type="checkbox"
        />
      </div>
    );
  }
}

export default Switch;
