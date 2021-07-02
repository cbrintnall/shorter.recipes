import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import AboutPage from './components/pages/about';
import SearchPage from './components/pages/search';
import firebase from 'firebase';

import './index.css';
import { UserContext } from './lib/auth';

function App() {
  const [ user, setUser ] = useState<firebase.User | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(state => {
      setUser(state);
    })
  })

  return (
    <UserContext.Provider value={user}>
      <Switch>
        <Route path="/search" component={SearchPage} />
        <Route path="/about" component={AboutPage} />
        <Redirect to="/search" />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
