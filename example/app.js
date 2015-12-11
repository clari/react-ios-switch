import 'babel/polyfill'
import 'react-resizable/css/styles.css'
import classNames from 'classnames'
import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import {ResizableBox} from 'react-resizable'
import styles from './app.scss'
import Switch from '../lib/Switch'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      size: Immutable.Map({
        flag: false,
        width: 80,
        height: 44,
        resizing: false
      }),
      label: Immutable.Map({
        flag: false
      }),
      color: Immutable.Map({
        flag: false
      })
    }
  }

  render () {
    return <div className={styles.app}>
      <div className={styles.example}>
        <ResizableBox className={classNames(styles.resizable, 'react-resizable')}
          width={this.state.size.get('width')}
          height={this.state.size.get('height')}
          minConstraints={[80, 44]}
          maxConstraints={[300, 200]}
          onResize={(e, data) => {
            this.setState({
              size: this.state.size.merge({
                width: data.size.width,
                height: data.size.height
              })
            })
          }}
          onResizeStart={() => {
            this.setState({
              size: this.state.size.set('resizing', true)
            })
          }}
          onResizeStop={() => {
            this.setState({
              size: this.state.size.set('resizing', false)
            })
          }}>
          <Switch className={styles.switch}
            checked={this.state.size.get('flag')}
            width={this.state.size.get('width') / 2}
            height={this.state.size.get('height') / 2}
            animated={!this.state.size.get('resizing')}
            onChange={checked => {
              this.setState({
                size: this.state.size.set('flag', checked)
              })
            }}/>
        </ResizableBox>
      </div>
      <div className={styles.example}>
        <label className={styles.label}>
          <Switch className={styles.switch}
            checked={this.state.label.get('flag')}
            onChange={checked => {
              this.setState({
                label: this.state.size.set('flag', checked)
              })
            }}/>
          Label
        </label>
      </div>
      <div className={styles.example}>
        <label className={styles.label}>
          <Switch className={styles.switch}
            checked/>
          Checked
        </label>
      </div>
      <div className={styles.example}>
        <label className={styles.label}>
          <Switch className={styles.switch}
            checked={false}/>
          Unchecked
        </label>
      </div>
      <div className={styles.example}>
        <label className={styles.label}>
          <Switch className={styles.switch}
            enabled={false}/>
          Disabled
        </label>
      </div>
      <div className={styles.example}>
        <label className={styles.label}>
          <Switch className={styles.switch}
            buttonColor='#FFDC00'
            checkedColor='#0074D9'
            uncheckedColor='black'
            checked={this.state.color.get('flag')}
            onChange={checked => {
              this.setState({
                color: this.state.color.set('flag', checked)
              })
            }}/>
          Custom Colors
        </label>
      </div>
    </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('content'))
