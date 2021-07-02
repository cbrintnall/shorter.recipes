import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import settings from './settings';
import './lib/utils';
import { BrowserRouter } from 'react-router-dom';

const app = firebase.initializeApp(settings.firebaseConfig);
firebase.analytics(app);

if (settings.useEmulators) {
  firebase.auth(app).useEmulator('http://localhost:9099');
}

ReactDOM.hydrate(
  <BrowserRouter basename={settings.urls.functionBasePath}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)