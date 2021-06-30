import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './settings';
import settings from './settings';
import './index.css';
import 'firebase/analytics';
import './lib/utils';
import { BrowserRouter } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);
firebase.analytics();

if (process.env.NODE_ENV === 'test') {
  firebase.auth().useEmulator('http://localhost:9099');
}

console.log(settings.urls.functionBasePath)

const application = (
  <React.StrictMode>
    <BrowserRouter basename={settings.urls.functionBasePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

ReactDOM.hydrate(
  application,
  document.getElementById('root')
)