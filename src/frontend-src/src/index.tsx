import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './settings';
import 'firebase/analytics';
import './lib/utils';

firebase.initializeApp(firebaseConfig);
firebase.analytics();

if (process.env.NODE_ENV === 'test') {
  firebase.auth().useEmulator('http://localhost:9099');
}

const application = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.hydrate(
  application,
  document.getElementById('root')
)

// TODO: Add depending on flag
// ReactDOM.render(
//   application,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();