import { easing, pointer, trackOffset, transform } from 'popmotion';
import React from 'react';

import normalizeColor from './normalizeColor';
import prefixStyle from './prefixStyle';

export default class Switch extends React.Component {
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
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleThumbClick = this.handleThumbClick.bind(this);
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
  
  getHeight() {
    return 30;
  }

  getOffColor() {
    return normalizeColor(this.props.offColor);
  }

  getOffSecondaryColor() {
    return this.getSecondaryColor({
      color: this.props.offColor,
      pendingColor: this.props.pendingOffColor,
    });
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
    return (this.getWidth() - this.getThumbLength()) - 2;
  }

  getOnColor() {
    return normalizeColor(this.props.onColor);
  }

  getOnSecondaryColor() {
    return this.getSecondaryColor({
      color: this.props.onColor,
      pendingColor: this.props.pendingOnColor,
    });
  }

  getSecondaryColor({
    color,
    pendingColor,
  }) {
    if (!pendingColor) {
      return color === 'white' ? 
        // default secondary color for white color
        '#dfdfdf' :
        normalizeColor(color);
    }

    return normalizeColor(pendingColor);
  }

  getThumbColor() {
    return normalizeColor(this.props.handleColor);
  }
  
  getThumbCursor() {
    if (this.isDisabled()) {
      return 'default';
    }

    return this.state.isDragging ? 'grabbing' : 'grab';
  }

  getThumbLength() {
    return this.getHeight() - 2;
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
      // handle case when the thumb is clicked
      !this.props.checked :
      // handle case when the thumb is dragged
      this.getOffsetProgress() >= 0.5;

    this.setState({ 
      isDragging: false,
      offset: null,
    });

    this.clickChange({ checked });
  }
  
  handleThumbClick(e) {
    e.stopPropagation();
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
    } = this.props;
            
    const { isDragging } = this.state;
            
    const color = transform.pipe(
      easing.createExpoIn(2),
      transform.blendColor(this.getOffColor(), this.getOnColor()),
      transform.rgba,
    )(this.getOffsetProgress());
    
    const borderColor = transform.pipe(
      easing.createExpoIn(1),
      transform.blendColor(this.getOffSecondaryColor(), this.getOnSecondaryColor()),
      transform.rgba,
    )(this.getOffsetProgress());
    
    return (
      <span
        className={className}
        onClick={this.handleClick}
        ref={this.setRef}
        style={prefixStyle({
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
        })}
      >
        <span 
          onClick={this.handleThumbClick}
          onMouseDown={this.handleMouseDown}
          style={prefixStyle({
            backgroundColor: this.getThumbColor(),
            borderRadius: '100%',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
            cursor: this.getThumbCursor(),
            display: 'inline-block',
            height: this.getThumbLength(),
            left: this.getOffset(),
            position: 'absolute',
            top: 0,
            transition: isDragging ? null : '0.2s',
            width: this.getThumbLength(),
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
