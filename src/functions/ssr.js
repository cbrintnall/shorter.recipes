import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router';
// TODO: Isolate frontend into its own package
import App from '../frontend/App';
import indexHtml from './index.html';

export const ssr = (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  );

  const final = indexHtml.replace("{{content}}", content);

  res.send(final)
}