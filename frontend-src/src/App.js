import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import AboutPage from './components/pages/about';
import SearchPage from './components/pages/search';

function App() {
  
  return (
    <>
      <Router>
        <Switch>
          <Route path="/search" component={SearchPage} />
          <Route path="/about" component={AboutPage} />
          <Redirect to="/search" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
