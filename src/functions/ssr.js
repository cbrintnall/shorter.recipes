import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router';
// TODO: Isolate frontend into its own package
import App from '../frontend/App';
import indexHtml from './index.html';
import { getRecipeData } from './recipe';
import settings from './settings';

export const ssr = (req, res) => {
  const initialState = {};
  
  if (req.query.url) {
    let requestTimedOut = false;

    // Don't want too long for request, send content instead
    const timeout = setTimeout(() => {
      requestTimedOut = true;
      sendSsrWithData(req, res);
    }, settings.recipeRequestTimeoutMS)

    getRecipeData(req.query.url)
      .then(data => { 
        // Guard against sending again since timeout has happened
        if (!requestTimedOut) {
          clearTimeout(timeout);
          initialState["recipe"] = data;
          sendSsrWithData(req, res, initialState);
        }
      })
      .catch(err => {
        // Guard against sending again since timeout has happened
        if (!requestTimedOut) {
          clearTimeout(timeout);
          sendSsrWithData(req, res); 
        }
      })
  } else {
    sendSsrWithData(req, res);
  }
}

const sendSsrWithData = (req, res, data = {}) => {
  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App initialState={data} />
    </StaticRouter>
  );

  const final = indexHtml
    .replace("{{content}}", content)
    .replace("{{initial_state}}", `window.__INITIAL_STATE__ = ${JSON.stringify(data)};`)

  res.send(final)
}