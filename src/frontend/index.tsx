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

// Check for any initial state from SSR
if (window && (window as any).__INITIAL_STATE__) {
  ReactDOM.hydrate(
    <BrowserRouter basename={settings.urls.functionBasePath}>
      <App initialState={(window as any).__INITIAL_STATE__ as { recipe: Record<string, unknown> }}/>
    </BrowserRouter>,
    document.getElementById('root')
  )
}