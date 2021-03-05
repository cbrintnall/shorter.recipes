export interface IResult {
    title: string,
    instructions: IInstruction[],
    ingredients: IIngredient[]
}

export interface IInstruction {}
export interface IIngredient {}

export abstract class LoadStrategy {
    abstract TryExtract(html: string): IResult | undefined;
}