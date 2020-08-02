import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import BaseNavbar from './components/navbar';
import SearchPage from './components/pages/search';
import ResultsPage from './components/pages/results';

function App() {
  
  return (
    <>
      <Router>
        <BaseNavbar />
        <Switch>
          <Route path="/search" component={SearchPage} />
          <Route path="/recipe" component={ResultsPage} />
          <Redirect to="/search" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
