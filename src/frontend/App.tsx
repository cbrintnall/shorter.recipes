import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import AboutPage from './components/pages/about';
import firebase from 'firebase';
import { AppState } from './lib/common.interface';
import './index.css';
import { UserContext } from './lib/auth';
import ResultsPage from './components/pages/results';
import LandingPage from './components/pages/landing';
import { SearchBar } from './components/search-bar';

function App(props: AppState) {
  const [ user, setUser ] = useState<firebase.User | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(state => {
      setUser(state);
    })
  })

  return (
    <UserContext.Provider value={user}>
      <SearchBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/recipe">
          <ResultsPage data={props.initialState.recipe}/>
        </Route>
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
