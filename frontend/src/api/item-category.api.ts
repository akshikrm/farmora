import type {
  NewItemRequest,
  EditItemPayload,
  EditItemRequest,
} from "@app-types/item-category.types";
import fetcher from "@utils/fetcher";
import fetcherV2 from "@utils/fetcherV2";

const itemCategory = {
  fetchAll: () => fetcher("items/categories"),
  getNames: () => fetcher("items/categories/names"),
  fetchById: (id: number) => fetcher(`items/categories/${id}`),
  create: async (payload: NewItemRequest) => {
    return await fetcherV2("items/categories", JSON.stringify(payload), {
      method: "POST",
    });
  },
  updateById: async (id: number, updateData: EditItemRequest) => {
    const payload: EditItemPayload = {
      name: updateData.name,
    };
    return await fetcher(`items/categories/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default itemCategory;
