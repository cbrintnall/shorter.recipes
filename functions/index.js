const functions = require('firebase-functions');
const cheerio = require('cheerio')
const fetch = require('node-fetch')

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
    return {
        title: ld.name,
        instructions: ld.recipeInstructions,
        ingredients: ld.recipeIngredient
    }
}

exports.main = functions.https.onRequest((req, res) => {
    const { url } = req.query

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json');

    if (!url) {
        res.send(JSON.stringify({ "error": "No URL to extract." }))
    }

    fetch(url)
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
