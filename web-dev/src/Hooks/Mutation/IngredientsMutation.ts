import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

export const useMutationIngredientCreate = (): UseMutationResult<
  any,
  unknown,
  { name: string; price: number; tag: string }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({ name, price, tag }: { name: string; price: number; tag: string }) => {
      return await axios.post(`/ingredient/create`, {
        name,
        price,
        tag,
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listRecipe);
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};

export const useMutationIngredientDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteIngredient],
    async (id: number) => {
      return await axios.delete(`/ingredient/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};

export const useMutationIngredientUpdate = (): UseMutationResult<
  any,
  unknown,
  { id: number; name: string; price: number; tag: string }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.updateIngredient],
    async ({ id, name, price, tag }: { id: number; name: string; price: number; tag: string }) => {
      console.log("Sending update for ingredient:", { id, name, price, tag });
      return await axios.put(`/ingredient/update`, {
        id,
        name,
        price,
        tag,
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
        clientQuery.invalidateQueries(Requests.listRecipe);
      },
    }
  );
};
