React iOS Switch
===
<img src="https://img.shields.io/npm/dm/react-ios-switch.svg">

[Example 1 - settings screen](https://clari.github.io/react-ios-switch)

[Example 2 - CodePen](https://codepen.io/mking-clari/pen/dzKxdb)

Usage
---
```javascript
import 'react-ios-switch/build/bundle.css';
import Switch from 'react-ios-switch';

// Simple version
<Switch
  checked={<bool>}
  onChange={checked => ...}
/>

// All props
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
yarn
yarn start
# Visit http://localhost:8080
```

References
---
- Design - [UISwitch](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UISwitch_Class)
- CSS - [CSS UISwitch](https://github.com/fnky/css3-uiswitch)
- Behavior - [Bootstrap Switch](http://bootstrapswitch.com)
- Behavior - [react-draggable](https://github.com/mzabriskie/react-draggable)
