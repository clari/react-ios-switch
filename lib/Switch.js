import classNames from 'classnames'
import {rgb} from 'd3-interpolate'
import React from 'react'
import styles from './Switch.scss'

class Switch extends React.Component {
  static MIN_OFFSET = 2
  static MAX_OFFSET = 20
  static UNCHECKED_COLOR = '#9cadb9'
  static CHECKED_COLOR = '#64bd60'

  static propTypes = {
    checked: React.PropTypes.bool.isRequired,
    enabled: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    enabled: true
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

  getOffset () {
    return this.getOffsetInterpolationValue() * (Switch.MAX_OFFSET - Switch.MIN_OFFSET) + Switch.MIN_OFFSET
  }

  getOffsetInterpolationValue () {
    const offset = Math.min(Switch.MAX_OFFSET, Math.max(Switch.MIN_OFFSET, (this.props.checked ? Switch.MAX_OFFSET : Switch.MIN_OFFSET) + this.state.moveX - this.state.downX))
    return this.state.dragging ? (offset - Switch.MIN_OFFSET) / (Switch.MAX_OFFSET - Switch.MIN_OFFSET) : (this.props.checked ? 1 : 0)
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
      const value = this.getOffset() - Switch.MIN_OFFSET > (Switch.MAX_OFFSET - Switch.MIN_OFFSET) / 2
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
        this.props.enabled && styles['switch--enabled']
      )}
      onClick={this.props.enabled && (e => {
        e.stopPropagation()
        this.props.onChange(!this.props.checked)
      })}
      style={{
        backgroundColor: rgb(Switch.UNCHECKED_COLOR, Switch.CHECKED_COLOR)(this.getOffsetInterpolationValue())
      }}>
      {this.state.dragging && <div className={styles.overlay}/>}
      <div className={styles.button}
        style={{
          left: this.getOffset()
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
