import classNames from 'classnames';
import Immutable from 'immutable';
import React from 'react';
import SettingCell from './SettingCell';
import SettingsTypes from './SettingsTypes';
import styles from './App.scss';

class App extends React.Component {
  static defaultProps = {
    settings: Immutable.List([
      Immutable.Map({
        type: SettingsTypes.LIST,
        name: 'Search Engine',
        value: 'Google',
      }),
      Immutable.Map({
        type: SettingsTypes.SWITCH,
        name: 'Search Engine Suggestions',
        value: true,
      }),
      Immutable.Map({
        type: SettingsTypes.SWITCH,
        name: 'Safari Suggestions',
        value: true,
      }),
      Immutable.Map({
        type: SettingsTypes.LIST,
        name: 'Quick Website Search',
        value: 'On',
      }),
      Immutable.Map({
        type: SettingsTypes.SWITCH,
        name: 'Preload Top Hit',
        value: true,
      }),
    ]),
  };

  constructor(props) {
    super(props);

    const { settings } = props;

    this.state = {
      settings: settings.map(setting => setting.get('name')).toList(),
      settingsIndex: settings.reduce((result, setting) => (
        result.set(setting.get('name'), setting)
      ), Immutable.Map()),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(settingId, checked) {
    const { settingsIndex } = this.state;
    this.setState({
      settingsIndex: settingsIndex.update(settingId, setting => setting.set('value', checked)),
    });
  }

  render() {
    const { className } = this.props;
    const { settings, settingsIndex } = this.state;
    return (
      <div className={classNames(styles.app, className)}>
        <div className={styles.phone}>
          <div className={styles.header}>
            <div className={styles.statusBar}>
              <div className={styles.statusBarConnection}>
                <div className={styles.statusBarConnectionType}>
                  Carrier
                </div>
                <i className={classNames(styles.statusBarConnectionIcon, 'fa', 'fa-wifi')}/>
              </div>
              <div className={styles.statusBarTime}>
                11:36 PM
              </div>
              <div className={styles.statusBarBattery}>
                <i className={classNames(styles.statusBarBatteryIcon, 'fa', 'fa-battery-full')}/>
              </div>
            </div>
            <div className={styles.actionBar}>
              <div className={styles.action}>
                <i className={classNames(styles.actionArrow, 'fa', 'fa-chevron-left')}/>
                <div className={styles.actionText}>
                  Settings
                </div>
              </div>
              <div className={styles.actionBarTitle}>
                Safari
              </div>
              <div className={styles.action}/>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.settingHeader}>
              Search
            </div>
            <div className={styles.settingCells}>
              {settings.map((settingId, i) => (
                <SettingCell
                  className={styles.settingCell}
                  key={i}
                  onChange={this.handleChange}
                  setting={settingsIndex.get(settingId)}
                />
              ))}
            </div>
            <div className={styles.settingFooter}>
              About Search & Privacy...
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
