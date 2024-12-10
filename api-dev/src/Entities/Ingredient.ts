import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  tag: string;

  @ManyToMany(() => Recipe, recipe => recipe.ingredients)
  recipes: Recipe[];
}
