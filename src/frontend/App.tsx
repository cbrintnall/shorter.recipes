import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import AboutPage from './components/pages/about';
import SearchPage from './components/pages/search';

function App() {
  return (
    <Switch>
      <Route path="/search" component={SearchPage} />
      <Route path="/about" component={AboutPage} />
      <Redirect to="/search" />
    </Switch>
  );
}

export default App;
