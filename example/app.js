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
      header: Immutable.Map({
        flag: false
      }),
      switch: Immutable.Map({
        flag: false
      }),
      label: Immutable.Map({
        flag: false
      }),
      colors: Immutable.Map({
        flag: false
      }),
      size: Immutable.Map({
        flag: false,
        width: 80,
        height: 44,
        resizing: false
      })
    }
  }

  render () {
    return <div className={styles.app}>
      <div className={styles.navbar}>
        <a className={styles.navbarLink} href='https://github.com/clariussystems/react-ios-switch'>GitHub</a>
      </div>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          React iOS Switch
        </h1>
        <h2 className={styles.headerSubtitle}>
          React switch component with a draggable button
        </h2>
        <Switch className={styles.headerSwitch}
          buttonColor='#f7f7f7'
          checkedColor='#333'
          uncheckedColor='#333'
          checked={this.state.header.get('flag')}
          onChange={checked => {
            this.setState({
              header: this.state.header.set('flag', checked)
            })
          }}/>
      </div>
      <div className={styles.examples}>
        <div className={styles.example}>
          <div className={styles.exampleDemo}>
            <Switch
              checked={this.state.switch.get('flag')}
              onChange={checked => {
                this.setState({
                  switch: this.state.switch.set('flag', checked)
                })
              }}/>
          </div>
          <pre className={styles.exampleCode}>{`${'<'}Switch
  checked={bool}
  onChange={checked => ...}/>`}</pre>
        </div>
        <div className={styles.example}>
          <div className={styles.exampleDemo}>
            <Switch
              checked
              enabled={false}/>
          </div>
          <pre className={styles.exampleCode}>{`${'<'}Switch
  enabled={bool}/>`}</pre>
        </div>
        <div className={styles.example}>
          <div className={styles.exampleDemo}>
            <label className={styles.label}>
              <Switch
                checked={this.state.label.get('flag')}
                onChange={checked => {
                  this.setState({
                    label: this.state.label.set('flag', checked)
                  })
                }}/>
              <span className={styles.labelText}>Label</span>
            </label>
          </div>
          <pre className={styles.exampleCode}>{`${'<'}label>
  ${'<'}Switch/>
  Label
${'<'}/label>`}</pre>
        </div>
        <div className={styles.example}>
          <div className={styles.exampleDemo}>
            <Switch
              buttonColor='#FFDC00'
              checkedColor='#0074D9'
              uncheckedColor='black'
              checked={this.state.colors.get('flag')}
              onChange={checked => {
                this.setState({
                  colors: this.state.colors.set('flag', checked)
                })
              }}/>
          </div>
          <pre className={styles.exampleCode}>{`${'<'}Switch
  className={className}
  buttonColor={color}
  checkedColor={color}
  uncheckedColor={color}/>`}</pre>
        </div>
        <div className={styles.example}>
          <div className={styles.exampleDemo}>
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
              <Switch className={styles.resizableSwitch}
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
          <pre className={styles.exampleCode}>{`${'<'}Switch
  width={number}
  height={number}/>`}</pre>
        </div>
      </div>
      <div className={styles.company}>
        <span>A <a className={styles.companyLink} href='http://www.clari.com'>Clari</a> open source project</span>
      </div>
    </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('content'))
