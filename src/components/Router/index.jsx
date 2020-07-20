import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

const Routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
    </div>
  </Router>
);

export default Routing;
