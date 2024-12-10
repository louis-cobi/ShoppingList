import { useState } from "react";
import { Button } from "../atoms/Button";
import { TextField } from "../atoms/TextField";
import { Select } from "../atoms/Select";
import { CardCustom } from "../CardCustom";
import { useMutationIngredientCreate } from "../../Hooks/Mutation/IngredientsMutation";

export function CreateIngredientForm(): JSX.Element {
  const { mutateAsync: createIngredient } = useMutationIngredientCreate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [tag, setTag] = useState("légumes");

  const resetFields = () => {
    setName("");
    setPrice(0);
    setTag("légumes");
  };

  const handlerSubmitNewIngredient = async () => {
    if (!name || !price) {
      alert("Please fill all the fields");
      return;
    }
    await createIngredient({ name, price, tag });
    resetFields();
  };

  return (
    <div>
      <CardCustom isSmall>
        <h2>New Ingredient</h2>
        <TextField label="Name of the ingredient" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value) || 0)}
        />
        <Select
          label="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          options={[
            { label: "Légumes", value: "légumes" },
            { label: "Protéine", value: "protéine" },
            { label: "Féculent", value: "féculent" },
          ]}
        />
        <Button onClick={handlerSubmitNewIngredient}>Submit</Button>
      </CardCustom>
    </div>
  );
}