import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import AboutPage from './components/pages/about';
import SearchPage from './components/pages/search';
import { UserContext } from './lib/auth';

import * as firebase from 'firebase';

function App() {
  const [ user, setUser ] = useState<firebase.User | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(state => {
      setUser(state);
    })
  })

  return (
    <>
      <UserContext.Provider value={user}>
        <Router>
          <Switch>
            <Route path="/search" component={SearchPage} />
            <Route path="/about" component={AboutPage} />
            <Redirect to="/search" />
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
