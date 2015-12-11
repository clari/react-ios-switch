React iOS Switch
===
> This is a [Clari](http://www.clari.com) open source project.

[Demo](http://clariussystems.github.io/react-ios-switch)

```
import 'react-ios-switch/index.css'
import Switch from 'react-ios-switch'

<Switch
  className='switch' // optional
  checked={true} // optional
  enabled={true} // optional
  checkedColor='red' // optional
  uncheckedColor='black' // optional
  onChange={checked => ...)}/> // optional
```

Local Development
---
```
npm install
npm start
# Visit http://localhost:8080
```

TODO
---
- Resizeable + demo with react-resizeable
- Configurable appearance
- Configurable state labels + demo with icons
- Consider rename to react-draggable-switch
- Default checked
