import { getRepository, In } from "typeorm";
import { Ingredient } from "../Entities/Ingredient";
import { Recipe } from "../Entities/Recipe";

export class RecipeService {
  static async list(): Promise<Recipe[]> {
    const recipes = await getRepository(Recipe).find({
      relations: ["ingredients"],
    });
    return recipes;
  }

  static async create(recipe: Recipe): Promise<Recipe> {
    if (recipe.ingredients) {
      const ingredients = await getRepository(Ingredient).find({
        where: { id: In(recipe.ingredients) },
      });
      recipe.ingredients = ingredients;
    }

    const newRecipe = await getRepository(Recipe).save(recipe);
    return newRecipe;
  }

  static async update(recipe: Recipe): Promise<Recipe> {
    const updatedRecipe = await getRepository(Recipe).save(recipe);
    return updatedRecipe;
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Recipe).delete(id);
  }

  static async isProteinUnique(proteinId: number): Promise<boolean> {
    const recipes = await getRepository(Recipe)
      .createQueryBuilder("recipe")
      .leftJoinAndSelect("recipe.ingredients", "ingredient")
      .where("ingredient.id = :proteinId", { proteinId })
      .andWhere("ingredient.tag = :tag", { tag: "protéine" })
      .getCount();

    return recipes === 0;
  }
}
