import { pointer, trackOffset, transform } from 'popmotion';
import React from 'react';

import normalizeColor from './normalizeColor';
import prefixer from './prefixer';

export default class Switch extends React.Component {
  static defaultProps = {
    disabled: false,
    // use "handleColor" instead of "thumbColor" for backwards compatibility
    handleColor: 'white',
    offColor: 'white',
    onChange: () => {},
    onColor: '#4cd964',
    // use "pendingOffColor" instead of "offSecondaryColor" for backwards compatibility
    pendingOffColor: '#dfdfdf', 
    // use "pendingOnColor" instead of "onSecondaryColor" for backwards compatibility
    pendingOnColor: null,
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
    return normalizeColor(this.props.pendingOffColor || this.props.offColor);
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
    return normalizeColor(this.props.pendingOnColor || this.props.onColor);
  }

  getThumbColor() {
    return normalizeColor(this.props.handleColor);
  }
  
  getThumbCursor() {
    if (this.props.disabled) {
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
    if (this.props.disabled) {
      return;
    }

    // handle case when the switch is clicked
    this.clickChange({
      checked: !this.props.checked,
    });
  }

  handleMouseDown(e) {
    if (this.props.disabled) {
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

  render() {
    const { 
      checked,
      className,
      disabled,
      onChange,
    } = this.props;
            
    const { isDragging } = this.state;
            
    const color = transform.pipe(
      transform.spring(5, 1),
      transform.clamp(0, 1),
      transform.blendColor(this.getOffColor(), this.getOnColor()),
      transform.rgba,
    )(this.getOffsetProgress());
    
    const borderColor = transform.pipe(
      transform.blendColor(this.getOffSecondaryColor(), this.getOnSecondaryColor()),
      transform.rgba,
    )(this.getOffsetProgress());
    
    return (
      <span
        className={className}
        onClick={this.handleClick}
        ref={this.setRef}
        style={prefixer.prefix({
          backgroundColor: color,
          border: `1px solid ${borderColor}`,
          borderRadius: this.getHeight() / 2,
          boxShadow: `inset 0 0 0 ${this.getOffset()}px ${borderColor}`,
          boxSizing: 'border-box',
          display: 'inline-block',
          height: this.getHeight(),
          opacity: disabled ? 0.5 : 1,
          position: 'relative',
          transition: isDragging ? null : '0.2s',
          width: this.getWidth(),
        })}
      >
        <span 
          onClick={this.handleThumbClick}
          onMouseDown={this.handleMouseDown}
          style={prefixer.prefix({
            backgroundColor: this.getThumbColor(),
            borderRadius: '100%',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
            cursor: this.getThumbCursor(),
            display: ['inline-block', '-webkit-inline-block'],
            height: this.getThumbLength(),
            left: this.getOffset(),
            position: 'absolute',
            top: 0,
            transition: isDragging ? 'width 0.2s' : '0.2s',
            width: this.getThumbLength(),
          })}
        />
        <input
          checked={checked}
          disabled={disabled}
          onChange={this.handleChange}
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
