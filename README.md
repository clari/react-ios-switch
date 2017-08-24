React iOS Switch
===
<img src="https://img.shields.io/npm/dm/react-ios-switch.svg">

[Demo](https://clari.github.io/react-ios-switch)

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

// All available props
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

[Try the code in CodePen.](https://codepen.io/mking-clari/pen/dzKxdb)

Setup
---
```
yarn
yarn start
# Visit http://localhost:8080
```

References
---
- [UISwitch](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UISwitch_Class)
- [CSS Switch](https://github.com/fnky/css3-uiswitch)
- [Bootstrap Switch](http://bootstrapswitch.com)
- [react-draggable](https://github.com/mzabriskie/react-draggable)
