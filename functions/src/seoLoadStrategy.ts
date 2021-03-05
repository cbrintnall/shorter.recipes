import { IResult, LoadStrategy } from './loadStrategy';
import cheerio from 'cheerio';

export class SeoLoadStrategy extends LoadStrategy {
    TryExtract(html: string): IResult {
        const $ = cheerio.load(html)
        const payload = $('script[type="application/ld+json"]')

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
    }
}