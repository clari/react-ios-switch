import classNames from 'classnames';
import React from 'react';
import SettingsTypes from './SettingsTypes';
import styles from './SettingCell.scss';
import Switch from '../Switch';

class SettingCell extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    const { onChange, setting } = this.props;
    onChange(setting.get('name'), checked);
  }

  render() {
    const { className, setting } = this.props;
    return (
      <label className={classNames(styles.settingCell, className)}>
        <div className={styles.settingCellName}>
          {setting.get('name')}
        </div>
        {setting.get('type') === SettingsTypes.LIST && (
          <div className={styles.listValue}>
            <div className={styles.listValueText}>
              {setting.get('value')}
            </div>
            <i className={classNames(styles.listValueArrow, 'fa', 'fa-chevron-right')}/>
          </div>
        )}
        {setting.get('type') === SettingsTypes.SWITCH && (
          <div className={styles.switchValue}>
            <Switch
              checked={setting.get('value')}
              className={styles.switch}
              onChange={this.handleChange}
            />
          </div>
        )}
      </label>
    );
  }
}

export default SettingCell;
