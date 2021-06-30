import * as functions from 'firebase-functions';
import { compile } from 'handlebars';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router';
// TODO: Isolate frontend into its own package
import App from '../frontend/App';
import Settings from './settings';

// TODO: CSS, favicon
const indexHTML =`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#303030" />
    <meta
      name="description"
      content="A simple application that can extract recipe information and display it in a straight-forward manner."
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
      crossorigin="anonymous"
    />
    <script defer="defer" src="{{asset}}"></script>
    <title>Shorter Recipes</title>
  </head>
  <body>
    <noscript>
      You'll need Javascript enabled, we hope to have a "minimal" JS version soon.
    </noscript>
    <div id="root">{{content}}</div>
  </body>
</html>
`

export const ssr = (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const bundlePath = functions.config()["client.js"];

  // TODO: we should display an error page or something.
  if (!bundlePath) {
    res.status(500)
    res.send("Please report this error.")
  } else {
    console.log(`URL: ${req.url}, serving bundle: ${bundlePath}`);

    const application = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    );

    const template = compile(indexHTML)
    const payload = {
        asset: `${Settings.hostBase}/${bundlePath}`, 
        content: application
    }
  
    res.send(template(payload))
  }
}