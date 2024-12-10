import { Button } from "../atoms/Button"
import { TableCell } from "../atoms/TableCell"
import { Select } from "../atoms/Select"
import { Ingredient } from "../../Types/Ingredient"
import {
    useMutationIngredientDelete,
    useMutationIngredientUpdate,
} from "../../Hooks/Mutation/IngredientsMutation"

export function IngredientTable({
    ingredients,
}: {
    ingredients: Ingredient[]
}): JSX.Element {
    const { mutateAsync: deleteIngredient } = useMutationIngredientDelete()
    const { mutateAsync: updateIngredient } = useMutationIngredientUpdate()

    const handlerButtonDelete = async (ingredient: Ingredient) => {
        await deleteIngredient(ingredient.id)
    }

    const handleTagChange = async (ingredient: Ingredient, newTag: string) => {
        await updateIngredient({ ...ingredient, tag: newTag })
    }

    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <TableCell>My Ingredients</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Delete</TableCell>
                </tr>
            </thead>
            <tbody>
                {ingredients.map((row) => (
                    <tr key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="right">
                            <Select
                                value={row.tag}
                                onChange={(e) =>
                                    handleTagChange(row, e.target.value)
                                }
                                options={[
                                    { label: "Protéine", value: "protéine" },
                                    { label: "Féculent", value: "féculent" },
                                    { label: "Légumes", value: "légumes" },
                                ]}
                                label={""}
                            />
                        </TableCell>
                        <TableCell align="right">{row.price} €</TableCell>
                        <TableCell align="right">
                            <Button onClick={() => handlerButtonDelete(row)}>
                                Delete
                            </Button>
                        </TableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
