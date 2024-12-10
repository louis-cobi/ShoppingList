import { IngredientService } from "../Services/IngredientService";

export class IngredientController {
  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const recipes = await IngredientService.list();
      res.send(recipes);
    } catch (err) {
      console.error("[IngredientController.list] Error listing recipes", err);
      res.send(500);
    }
  }

  public static async create(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await IngredientService.create(req.body);
      res.send(recipe);
    } catch (err) {
      console.error("[IngredientController.create] Error creating recipe", err);
      res.send(500);
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const { id, tag } = req.body;
 
      const nonValidRecipes = await IngredientService.checkRecipe(id, tag);
  
      if (nonValidRecipes.length > 0) {
        return res.status(400).json({
          message: "Les recettes suivantes ne sont pas conformes",
          recipes: nonValidRecipes
        });
      }
  
      const updatedIngredient = await IngredientService.update(req.body);
      
      console.log("Updating ingredient with data:", req.body);
      res.json(updatedIngredient);
    } catch (err) {
      console.error("[IngredientController.update] Error updating recipe", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await IngredientService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error("[IngredientController.delete] Error deleting recipe", err);
      res.send(500);
    }
  }
}
