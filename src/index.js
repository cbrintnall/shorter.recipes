import * as functions from 'firebase-functions';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { compile } from 'handlebars';
import ReactDOMServer from 'react-dom/server'
import App from './frontend-src/src/App';

const getRecipe = (body) => {
    const $ = cheerio.load(body)
    const payload = $('script[type="application/ld+json"]')

    // TODO: Handle this case
    if (payload.length > 1) {
        return Promise.reject('Found more than one result for payload.')
    }

    let json = payload.html().trim()
    if (json[json.length-1] !== "}" && json[json.length-1] !== "]") {
        if (json[json.length-2] === "}") {
            json = String(json).substring(0, json.length-1)
        } else {
            return Promise.reject('Unable to parse recipe')
        }
    }

    let tree = JSON.parse(json)

    if (Object.keys(tree).includes("@type") && tree["@type"] === "Recipe") {
        return Promise.resolve(tree)
    }

    if (Object.keys(tree).includes("@graph")) {
        tree = tree["@graph"]
    }
    
    const asJson = 
        Array.from(tree)
            .filter(item => Object.keys(item).includes('@type'))
            .filter(item => item['@type'] === "Recipe")

    if (asJson.length > 0) {
        return Promise.resolve(asJson[0])
    } else {
        return Promise.reject('Unable to grab recipe')
    }
}

const formatResponse = (ld) => {
    let instructions = ld.recipeInstructions;

    if (Array.isArray(instructions)) {
        const instructionTypes = ld.recipeInstructions.filter(instruction =>
            instruction.itemListElement && 
            Array.isArray(instruction.itemListElement)
        );
    
        // If all the instructions are of type 'HowToSection'...
        if (instructionTypes.length === ld.recipeInstructions.length) {
            instructions = ld.recipeInstructions.map(
                instruction => instruction.itemListElement.flat()
            ).flat()
        }   
    } else if (typeof(instructions) === 'string') {
        instructions = instructions
            .split('. ')
            .filter(instruction => !!instruction)
            .map(instruction => { return { text: instruction.trim() } })
    }

    return {
        title: ld.name,
        instructions: instructions,
        ingredients: ld.recipeIngredient
    }
}

const constructUrl = url => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
    } else {
        return `https://${url}`;
    }
}

exports.main = functions.https.onRequest((req, res) => {
    const { url } = req.query

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json');

    if (!url) {
        res.send(JSON.stringify({ "error": "No URL to extract." }))
    }

    fetch(constructUrl(url))
        .then(r => r.text())
        .then(getRecipe)
        .then(r => {
            res.send(JSON.stringify(formatResponse(r)))
        })
        .catch(err => {
            console.error(err)
            res.status(500)
            res.send(JSON.stringify({"error": err}))
        })
});

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

exports.ssr = functions.https.onRequest((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    const application = ReactDOMServer.renderToString(App);
    const template = compile(indexHTML)
    const payload = {
        asset: 'http://localhost:9090/default-bucket/client.9ced0ac2abf2d8f8723f.js', 
        content: application
    }

    res.send(template(payload))
})