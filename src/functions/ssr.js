import * as functions from 'firebase-functions';
import { compile } from 'handlebars';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router';
// TODO: Isolate frontend into its own package
import App from '../frontend/App';
import Settings from './settings';
import indexHtml from './index.html';

export const ssr = (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const bundlePath = functions.config()["client.js"];

  // TODO: we should display an error page or something.
  if (!bundlePath) {
    res.status(500)
    res.send("Please report this error.")
  } else {
    console.log(`URL: ${req.url}, serving bundle: ${bundlePath}`);

    const content = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    );

    const final = indexHtml.replace("{{content}}", content);

    res.send(final)
  }
}