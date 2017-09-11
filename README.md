react-ios-switch
===
<img src="https://img.shields.io/npm/dm/react-ios-switch.svg">

[Demo](https://clari.github.io/react-ios-switch)

[CodePen](https://codepen.io/mking-clari/pen/dzKxdb)

Features
---
- Drag or click to toggle
- Works with labels 

Usage
---
```javascript
import Switch from 'react-ios-switch';

// Simple usage
<Switch
  checked={checked}
  onChange={({ checked }) => {}}
/>

// All props (defaults shown below)
<Switch
  checked={false}
  disabled={false}
  handleColor="white"
  offColor="white"
  onChange={() => {}}
  onColor="#4cd964"
  pendingOffColor="#dfdfdf"
  pendingOnColor={null}
/>
```

Development
---
```
# Install packages
yarn

# Start server
yarn start

# Visit http://localhost:8080
```

Inspirations
---
- [Switchery](https://abpetkov.github.io/switchery)
- [Human Interface Guidelines](https://developer.apple.com/ios/human-interface-guidelines/visual-design/color)