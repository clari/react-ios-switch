import { easing, pointer, trackOffset, transform } from 'popmotion';
import PropTypes from 'prop-types';
import React from 'react';

import normalizeColor from './normalizeColor';
import prefixStyle from './prefixStyle';

export default class Switch extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    handleColor: PropTypes.string,
    name: PropTypes.string,
    offColor: PropTypes.string,
    onChange: PropTypes.func,
    onColor: PropTypes.string,
    pendingOffColor: PropTypes.string,
    pendingOnColor: PropTypes.string,
    readOnly: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    handleColor: 'white',
    offColor: 'white',
    onChange: () => {},
    onColor: 'rgb(76, 217, 100)',
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      isDragging: false,
      offset: null,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHandleClick = this.handleHandleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  clickChange({ checked }) {
    if (this.ref.parentNode && this.ref.parentNode.tagName.toLowerCase() === 'label') {
      // if the parent is a label, we don't need to emit the change event ourselves
      return;
    }

    this.props.onChange({ checked });
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
  
  getHandleColor() {
    return normalizeColor(this.props.handleColor);
  }
  
  getHandleCursor() {
    if (this.isDisabled()) {
      return 'default';
    }

    return this.state.isDragging ? 'grabbing' : 'grab';
  }

  getHandleLength() {
    return this.getHeight() - 2;
  }
  
  getHeight() {
    return 30;
  }

  getOffColor() {
    return normalizeColor(this.props.offColor);
  }

  getOffset() {
    if (this.state.isDragging) {
      return this.state.offset;
    }
    
    return this.props.checked ? this.getOffsetWidth() : 0;
  }
  
  getOffsetProgress() {
    return this.getOffset() / this.getOffsetWidth();
  }
  
  getOffsetWidth(props) {
    return (this.getWidth() - this.getHandleLength()) - 2;
  }

  getOnColor() {
    return normalizeColor(this.props.onColor);
  }

  getPendingColor({
    color,
    pendingColor,
  }) {
    if (!pendingColor) {
      return color === 'white' ? 
        // default pending color for white color
        '#dfdfdf' :
        normalizeColor(color);
    }

    return normalizeColor(pendingColor);
  }

  getPendingOffColor() {
    return this.getPendingColor({
      color: this.props.offColor,
      pendingColor: this.props.pendingOffColor,
    });
  }

  getPendingOnColor() {
    return this.getPendingColor({
      color: this.props.onColor,
      pendingColor: this.props.pendingOnColor,
    });
  }
  
  getWidth() {
    return 50;
  }
  
  handleChange(e) {
    this.props.onChange({
      checked: e.target.checked,
    });
  }

  handleClick(e) {
    if (this.isDisabled()) {
      return;
    }

    // handle case when the switch is clicked
    this.clickChange({
      checked: !this.props.checked,
    });
  }
  
  handleHandleClick(e) {
    e.stopPropagation();
  }

  handleMouseDown(e) {
    if (this.isDisabled()) {
      return;
    }
  
    this.pointerTracker = pointer(e).start();
    
    this.offsetTracker = trackOffset(this.pointerTracker.x, {
      from: this.getOffset(),
      onUpdate: transform.pipe(
        transform.clamp(0, this.getOffsetWidth()),
        offset => this.setState({ offset })
      ),
    }).start();
    
    this.setState({
      isDragging: true,
      offset: this.getOffset(),
    });
  }
  
  handleMouseUp() {
    if (!this.state.isDragging) {
      return;
    }
  
    this.pointerTracker.stop();
    this.offsetTracker.stop();
    
    const prevOffset = this.props.checked ? this.getOffsetWidth() : 0;
    const checked = this.state.offset === prevOffset ?
      // handle case when the handle is clicked
      !this.props.checked :
      // handle case when the handle is dragged
      this.getOffsetProgress() >= 0.5;

    this.setState({ 
      isDragging: false,
      offset: null,
    });

    this.clickChange({ checked });
  }
  
  isDisabled() {
    return this.props.disabled || this.props.readOnly;
  }

  render() {
    const { 
      checked,
      className,
      disabled,
      name,
      onChange,
      readOnly,
      style,
    } = this.props;
            
    const { isDragging } = this.state;
            
    const color = transform.pipe(
      easing.createExpoIn(2),
      transform.blendColor(this.getOffColor(), this.getOnColor()),
      transform.rgba,
    )(this.getOffsetProgress());
    
    const borderColor = transform.pipe(
      easing.createExpoIn(1),
      transform.blendColor(this.getPendingOffColor(), this.getPendingOnColor()),
      transform.rgba,
    )(this.getOffsetProgress());
    
    return (
      <span
        className={className}
        onClick={this.handleClick}
        ref={this.setRef}
        style={{
          ...prefixStyle({
            backgroundColor: color,
            border: `1px solid ${borderColor}`,
            borderRadius: this.getHeight() / 2,
            boxShadow: `inset 0 0 0 ${this.getOffset()}px ${borderColor}`,
            boxSizing: 'border-box',
            display: 'inline-block',
            height: this.getHeight(),
            opacity: this.isDisabled() ? 0.5 : 1,
            position: 'relative',
            transition: isDragging ? null : '0.2s',
            userSelect: 'none',
            width: this.getWidth(),
          }),
          ...style,
        }}
      >
        <span 
          onClick={this.handleHandleClick}
          onMouseDown={this.handleMouseDown}
          style={prefixStyle({
            backgroundColor: this.getHandleColor(),
            borderRadius: '100%',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
            cursor: this.getHandleCursor(),
            display: 'inline-block',
            height: this.getHandleLength(),
            left: this.getOffset(),
            position: 'absolute',
            top: 0,
            transition: isDragging ? null : '0.2s',
            width: this.getHandleLength(),
          })}
        />
        <input
          checked={checked}
          disabled={disabled}
          name={name}
          onChange={this.handleChange}
          readOnly={readOnly}
          style={{
            display: 'none',
          }}
          type="checkbox"
        />
      </span>
    );
  }

  setRef(ref) {
    this.ref = ref;
  }
}
