import { RecipeService } from "../Services/RecipeService";
import { IngredientService } from "../Services/IngredientService";

export class RecipeController {
  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const recipes = await RecipeService.list();
      res.send(recipes);
    } catch (err) {
      console.error("[RecipeController.list] Error listing recipes", err);
      res.send(500);
    }
  }

  public static async create(req: any, res: any, next: any): Promise<void> {
    try {
      const { ingredients } = req.body;
      const proteinIds: number[] = [];

      for (const id of ingredients) {
        const ingredient = await IngredientService.getById(id);
        if (!ingredient) {
          res.status(404).send(`Ingredient with id ${id} not found.`);
          return;
        }
        if (ingredient.tag === "protéine") {
          proteinIds.push(id);
        }
      }

      for (const proteinId of proteinIds) {
        const isUnique = await RecipeService.isProteinUnique(proteinId);
        if (!isUnique) {
          res.status(400).send(`Protein with id ${proteinId} is already used in another recipe.`);
          return;
        }
      }
      const recipe = await RecipeService.create(req.body);
      res.send(recipe);
    } catch (err) {
      console.error("[RecipeController.create] Error creating recipe", err);
      res.send(500);
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await RecipeService.update(req.body);
      res.send(recipe);
    } catch (err) {
      console.error("[RecipeController.update] Error updating recipe", err);
      res.send(500);
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await RecipeService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error("[RecipeController.delete] Error deleting recipe", err);
      res.send(500);
    }
  }
}
