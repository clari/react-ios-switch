import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import Example from './Example';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route component={Example} exact path="/" />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('content')
);
