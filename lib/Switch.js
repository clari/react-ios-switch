import classNames from 'classnames'
import {rgb} from 'd3-interpolate'
import React from 'react'
import styles from './Switch.scss'

class Switch extends React.Component {
  static propTypes = {
    animated: React.PropTypes.bool,
    buttonColor: React.PropTypes.string,
    buttonMargin: React.PropTypes.number,
    checked: React.PropTypes.bool,
    checkedColor: React.PropTypes.string,
    className: React.PropTypes.string,
    enabled: React.PropTypes.bool,
    height: React.PropTypes.number,
    onChange: React.PropTypes.func,
    uncheckedColor: React.PropTypes.string,
    width: React.PropTypes.number
  }

  static defaultProps = {
    animated: true,
    buttonColor: 'white',
    buttonMargin: 2,
    checkedColor: '#64bd60',
    enabled: true,
    height: 22,
    uncheckedColor: '#9cadb9',
    width: 40
  }

  addListeners () {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  constructor (props) {
    super(props)
    this.state = {
      dragging: false
    }
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  componentWillUnmount () {
    this.removeListeners()
  }

  getButtonSize () {
    return this.props.height - 2 * this.props.buttonMargin
  }

  getMaxOffset () {
    return this.props.width - this.getButtonSize() - this.props.buttonMargin
  }

  getMinOffset () {
    return this.props.buttonMargin
  }

  getOffset () {
    return this.getOffsetInterpolationValue() * (this.getMaxOffset() - this.getMinOffset()) + this.getMinOffset()
  }

  getOffsetInterpolationValue () {
    const offset = Math.min(this.getMaxOffset(), Math.max(this.getMinOffset(), (this.props.checked ? this.getMaxOffset() : this.getMinOffset()) + this.state.moveX - this.state.downX))
    return this.state.dragging ? (offset - this.getMinOffset()) / (this.getMaxOffset() - this.getMinOffset()) : (this.props.checked ? 1 : 0)
  }

  handleMouseMove (e) {
    this.setState({
      dragging: true,
      moveX: e.clientX
    })
  }

  handleMouseUp () {
    this.removeListeners()
    if (this.state.dragging) {
      const value = this.getOffset() - this.getMinOffset() > (this.getMaxOffset() - this.getMinOffset()) / 2
      this.setState({
        dragging: false
      })
      this.props.onChange(value)
    } else {
      this.props.onChange(!this.props.checked)
    }
  }

  removeListeners () {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render () {
    return <div
      className={classNames(
        styles.switch,
        this.state.dragging && styles['switch--dragging'],
        this.props.enabled && styles['switch--enabled'],
        this.props.animated && styles['switch--animated'],
        this.props.className
      )}
      onClick={this.props.enabled && (e => {
        e.preventDefault()
        e.stopPropagation()
        this.props.onChange(!this.props.checked)
      })}
      style={{
        backgroundColor: rgb(this.props.uncheckedColor, this.props.checkedColor)(this.getOffsetInterpolationValue()),
        borderRadius: this.props.height / 2,
        width: this.props.width,
        height: this.props.height
      }}>
      {this.state.dragging && <div className={styles.overlay}/>}
      <input className={styles.checkbox}
        type='checkbox'
        checked={this.props.checked}/>
      <div className={styles.button}
        style={{
          backgroundColor: this.props.buttonColor,
          top: this.props.buttonMargin,
          left: this.getOffset(),
          width: this.getButtonSize(),
          height: this.getButtonSize()
        }}
        onClick={e => e.stopPropagation()}
        onMouseDown={this.props.enabled && (e => {
          this.setState({
            downX: e.clientX
          })
          this.addListeners()
        })}/>
    </div>
  }
}

export default Switch
