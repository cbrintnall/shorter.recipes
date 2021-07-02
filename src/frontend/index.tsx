import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';
import { firebaseConfig } from './settings';
import settings from './settings';
import 'firebase/analytics';
import 'firebase/auth';
import './lib/utils';
import { BrowserRouter } from 'react-router-dom';

const app = firebase.initializeApp(firebaseConfig);
firebase.analytics(app);

if (process.env.NODE_ENV === 'development') {
  firebase.auth(app).useEmulator('http://localhost:9099');
}

ReactDOM.hydrate(
  <BrowserRouter basename={settings.urls.functionBasePath}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)