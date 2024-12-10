export interface Ingredient {
  id: number;
  name: string;
  price: number;
  tag: "légumes" | "protéine" | "féculent";
}
