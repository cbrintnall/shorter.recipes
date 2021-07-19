import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router';
// TODO: Isolate frontend into its own package
import App from '../frontend/App';
import indexHtml from './index.html';
import { getRecipeData } from './recipe';

export const ssr = (req, res) => {
  if (req.query.url) {
    getRecipeData(req.query.url)
      .then(data => { 
        // Guard against sending again since timeout has happened
        sendSsrWithData(req, res, { recipe: data });
      })
      .catch(err => {
        sendSsrWithData(req, res); 
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