import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { Ingredient } from "../Types/Ingredient";
import { useMutationIngredientDelete, useMutationIngredientUpdate } from "../Hooks/Mutation/IngredientsMutation";

export function IngredientTable({
  ingredients,
}: {
  ingredients: Ingredient[];
}): JSX.Element {
  const { mutateAsync: deleteIngredient } = useMutationIngredientDelete();
  const { mutateAsync: updateIngredient } = useMutationIngredientUpdate();

  const handlerButtonDelete = async (ingredient: Ingredient) => {
    await deleteIngredient(ingredient.id);
  };

  const handleTagChange = async (ingredient: Ingredient, newTag: string) => {
    try {
      await updateIngredient({ ...ingredient, tag: newTag });
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert(`The following recipes will be invalid: ${error.response.data.recipes}`);
      }
    }
  };

  return (
    <Box className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My ingredients</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                    <Select
                      value={row.tag}
                      onChange={(e) => handleTagChange(row, e.target.value)}
                    >
                      <MenuItem value="protéine">Protéine</MenuItem>
                      <MenuItem value="féculent">Féculent</MenuItem>
                      <MenuItem value="légumes">Légumes</MenuItem>
                    </Select>
                  </TableCell>
                <TableCell align="right">{row.price} €</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handlerButtonDelete(row)}>
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
