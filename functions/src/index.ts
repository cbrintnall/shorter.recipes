import * as functions from 'firebase-functions';
import fetch from 'node-fetch';

const getRecipe = (body: string) => {
    

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

const constructUrl = (url: string): string => {
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

    if (url as string) {
        fetch(constructUrl(url as string))
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
    }
});
