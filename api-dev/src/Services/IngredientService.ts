import { getRepository } from "typeorm";
import { Ingredient } from "../Entities/Ingredient";
import { Recipe } from "../Entities/Recipe";
import { log } from "winston";

export class IngredientService {
  static async list(): Promise<Ingredient[]> {
    const ingredient = await getRepository(Ingredient).find();
    return ingredient;
  }

  static async getById(id: number): Promise<Ingredient | null> {
    const ingredient = await getRepository(Ingredient).findOne(id);
    return ingredient || null;
  }

  static async create(ingredient: Ingredient): Promise<Ingredient> {
    const newIngredient = await getRepository(Ingredient).save(ingredient);
    return newIngredient;
  }

  static async update(ingredient: Ingredient): Promise<Ingredient> {
    const updatedIngredient = await getRepository(Ingredient).save(ingredient);
    return updatedIngredient;
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Ingredient).delete(id);
  }

  static async checkRecipe(ingredientId: number, newTag: string): Promise<string[]> {
    try {
      const recipes = await getRepository(Recipe)
        .createQueryBuilder("recipe")
        .innerJoin("recipe.ingredients", "ingredient")
        .where("ingredient.id = :ingredientId", { ingredientId })
        .getMany();
  
      let nonValidRecipes: string[] = [];

      for (const recipe of recipes) {
        const fullRecipe = await getRepository(Recipe)
          .createQueryBuilder("recipe")
          .leftJoinAndSelect("recipe.ingredients", "ingredient")
          .where("recipe.id = :recipeId", { recipeId: recipe.id })
          .getOne();
  
        if (!fullRecipe || !fullRecipe.ingredients || fullRecipe.ingredients.length === 0) continue;

        const ingredients = fullRecipe.ingredients;
        const proteinCount = ingredients.filter(i => i.tag === "protéine").length;
        const feculentCount = ingredients.filter(i => i.tag === "féculent").length;

        const updatedProteinCount = newTag === "protéine" ? proteinCount + 1 : proteinCount;
        const updatedFeculentCount = newTag === "féculent" ? feculentCount + 1 : feculentCount;
  
        console.log(`Updated - proteinCount: ${updatedProteinCount}, feculentCount: ${updatedFeculentCount}`);
  
        if (updatedProteinCount > 1 || updatedFeculentCount > 1) {
          nonValidRecipes.push(fullRecipe.name);
        }
      }
  
      return nonValidRecipes;
    } catch (error) {
      console.error("Error in checkRecipe:", error);
      throw error;
    }
  }
}
