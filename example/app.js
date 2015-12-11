import './reset.scss'
import 'babel/polyfill'
import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './app.scss'
import Switch from '../lib/Switch'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false
    }
  }

  render () {
    return <div className={styles.app}>
      <div className={styles.container}
        onClick={() => console.log('Background clicked')}>
        <label className={styles.label}>
          <Switch className={styles.switch}
            checked={this.state.flag}
            onChange={checked => {
              this.setState({
                flag: checked
              })
            }}/>
          Flag
        </label>
      </div>
    </div>
  }
}

ReactDOM.render(<App/>, $('#content')[0])
