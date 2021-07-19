import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { LdJsonExtractStrategy } from './extract-strategy';

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
  const html = cheerio.load(body);

  return Promise.race([
    new LdJsonExtractStrategy().getRecipe(html)
  ]);
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
  } else if (typeof (instructions) === 'string') {
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