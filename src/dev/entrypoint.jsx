import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import DemoExample from '../demo/Example';
import LabelExample from './Example';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route component={LabelExample} exact path="/label" />
        <Route component={DemoExample} exact path="/demo" />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('content')
);
