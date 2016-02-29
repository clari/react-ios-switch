import dynamics from 'dynamics.js';
import { interpolate } from 'd3-interpolate';
import classNames from 'classnames';
import invariant from 'invariant';
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

    const offset = this.getCheckedStateOffset(props);

    this.state = {
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

  componentWillReceiveProps(nextProps) {
    this.startAnimation(nextProps);
  }

  componentWillUnmount() {
    const { dragging } = this.state;
    this.cancelAnimation();
    if (dragging) {
      this.removeListeners();
    }
  }

  getCheckedStateOffset(props) {
    const { checked, maxOffset } = props;
    return checked ? maxOffset : 0;
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
    const { checked, onChange } = this.props;
    e.preventDefault();
    onChange(!checked);
  }

  handleHandleClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleInputChange() {
  }

  handleMouseDown(e) {
    const { dragging } = this.state;
    invariant(!dragging, 'Mouse down handler called inside of a drag');

    if (e.button !== 0) {
      return;
    }

    this.cancelAnimation();
    this.setState({
      currentClientX: e.clientX,
      dragging: true,
      startClientX: e.clientX,
    });
    this.addListeners();
  }

  handleMouseMove(e) {
    const { dragging } = this.state;
    invariant(dragging, 'Mouse move handler called outside of a drag');

    this.setState({
      currentClientX: e.clientX,
    });
  }

  handleMouseUp() {
    const { checked, maxOffset, onChange } = this.props;
    const { currentClientX, dragging, offset, startClientX } = this.state;

    invariant(dragging, 'Mouse up handler called outside of a drag');
    this.removeListeners();

    const deltaX = currentClientX - startClientX;
    if (!deltaX) {
      this.setState({
        dragging: false,
      });
      onChange(!checked);
      return;
    }

    const newOffset = offset + deltaX;
    const newChecked = newOffset > maxOffset / 2;

    this.setState({
      dragging: false,
      offset: newOffset,
    });
    onChange(newChecked);
  }

  removeListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  startAnimation(props) {
    const { offset } = this.state;
    this.animatedProperties.offset = offset;
    dynamics.animate(this.animatedProperties, {
      offset: this.getCheckedStateOffset(props),
    }, {
      change: this.handleAnimationChange,
      frequency: 200,
      friction: 400,
      type: dynamics.spring,
    });
  }

  render() {
    const {
      checked,
      disabled,
      handleColor,
      maxOffset,
      offColor,
      onColor,
      pendingOffColor,
    } = this.props;

    const { currentClientX, dragging, offset, startClientX } = this.state;

    const deltaX = dragging ? currentClientX - startClientX : 0;
    const clampedOffset = Math.min(maxOffset, Math.max(0, offset + deltaX));
    const handleTransform = `translateX(${clampedOffset}px)`;

    const t = clampedOffset / maxOffset;
    const color = interpolate(pendingOffColor, onColor)(t);
    const offStateTransform = `scale(${1 - t})`;

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
            msTransform: offStateTransform,
            transform: offStateTransform,
            WebkitTransform: offStateTransform,
          }}
        />
        <div
          className={styles.handle}
          onClick={this.handleHandleClick}
          onMouseDown={!disabled && this.handleMouseDown}
          style={{
            backgroundColor: handleColor,
            msTransform: handleTransform,
            transform: handleTransform,
            WebkitTransform: handleTransform,
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
