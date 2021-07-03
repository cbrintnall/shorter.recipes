import cheerio from 'cheerio';
import fetch from 'node-fetch';

export const getRecipeRoute = (req, res) => {
  const { url } = req.query

  res.header('Content-Type', 'application/json');

  if (!url) {
      res.send(JSON.stringify({ "error": "No URL to extract." }))
  }

  getRecipeData(url)
    .then(data => {
        res.send(JSON.stringify(data))
    })
    .catch(err => {
        res.status(500).send(JSON.stringify({ "error": err }))
    })
}

export const getRecipeData = url => {
    return fetch(constructUrl(url))
        .then(r => r.text())
        .then(getRecipe)
        .then(formatResponse)
}

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