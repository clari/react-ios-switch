React iOS Switch
===
[Demo](http://clariussystems.github.io/react-ios-switch)

Features
---
- Click to toggle
- Draggable handle
- Customizable colors
- Animation
- Hidden input for interaction with labels

Usage
---
```javascript
import 'react-ios-switch/build/bundle.css';
import Switch from 'react-ios-switch';

<Switch
  checked={<bool>}
  disabled={<bool>}
  handleColor={<color>}
  offColor={<color>}
  onChange={checked => ...}
  onColor={<color>}
  pendingOffColor={<color>}
/>
```

Setup
---
```
npm install
npm start
# Visit http://localhost:8080
```

References
---
- [UISwitch](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UISwitch_Class)
- [CSS UISwitch](https://github.com/fnky/css3-uiswitch)
- [react-draggable](https://github.com/mzabriskie/react-draggable)
- [Bootstrap Switch](http://www.bootstrap-switch.org)
