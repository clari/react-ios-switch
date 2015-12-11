import classNames from 'classnames'
import {rgb} from 'd3-interpolate'
import React from 'react'
import styles from './Switch.scss'

const MIN_OFFSET = 2
const MAX_OFFSET = 20

class Switch extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    checkedColor: React.PropTypes.string,
    className: React.PropTypes.string,
    enabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    uncheckedColor: React.PropTypes.string
  }

  static defaultProps = {
    checkedColor: '#64bd60',
    enabled: true,
    uncheckedColor: '#9cadb9'
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
    return this.getOffsetInterpolationValue() * (MAX_OFFSET - MIN_OFFSET) + MIN_OFFSET
  }

  getOffsetInterpolationValue () {
    const offset = Math.min(MAX_OFFSET, Math.max(MIN_OFFSET, (this.props.checked ? MAX_OFFSET : MIN_OFFSET) + this.state.moveX - this.state.downX))
    return this.state.dragging ? (offset - MIN_OFFSET) / (MAX_OFFSET - MIN_OFFSET) : (this.props.checked ? 1 : 0)
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
      const value = this.getOffset() - MIN_OFFSET > (MAX_OFFSET - MIN_OFFSET) / 2
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
        this.props.className
      )}
      onClick={this.props.enabled && (e => {
        e.preventDefault()
        e.stopPropagation()
        this.props.onChange(!this.props.checked)
      })}
      style={{
        backgroundColor: rgb(this.props.uncheckedColor, this.props.checkedColor)(this.getOffsetInterpolationValue())
      }}>
      {this.state.dragging && <div className={styles.overlay}/>}
      <input className={styles.checkbox}
        type='checkbox'
        checked={this.props.checked}/>
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
