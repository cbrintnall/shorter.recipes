import { CheerioAPI } from 'cheerio';

type IngredientUnit = "teaspoon" | "tablespoon" | "cup"

interface Ingredient {
  quantity: number;
  name: string;
  unit?: string;
}

// Cooktime in MS.
interface CookTime {
  prepTime: number;
  cookTime: number;
}

interface Recipe {
  author?: string,
  owningLink?: string,
  title: string,
  steps: string[];
  ingredients: Ingredient[];
}

abstract class RecipeExtractStrategy {
  public abstract getRecipe($: CheerioAPI): Promise<Recipe | undefined>;
}

class LdJsonExtractStrategy extends RecipeExtractStrategy {
  public getRecipe($: CheerioAPI): Promise<Recipe | undefined> {
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
            .pop();
  
    if (this.isProperLd(asJson) && this.canExtract(asJson)) {
      console.log(asJson)
    } else {

    }

    return Promise.resolve({} as Recipe);
  }

  // Simple key check for now, eventually we'll want to look for multiple keys.
  private canExtract(value: Record<string, unknown>): boolean {
    const bools = [
      !!value.recipeInstructions,
      !!value.recipeIngredient,
      !!value.prepTime,
      !!value.cookTime,
      !!value.author
    ]

    return bools.every(Boolean);
  }

  private isProperLd(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === 'object';
  }
}

export {
  LdJsonExtractStrategy
}