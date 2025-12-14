import type {
  NewItemCategoryRequest,
  EditItemCategoryPayload,
  EditItemCategoryRequest,
} from "@app-types/item-category.types";
import fetcher from "@utils/fetcher";

const itemCategory = {
  fetchAll: () => fetcher("items/categories"),
  getNames: () => fetcher("items/categories/names"),
  fetchById: (id: number) => fetcher(`items/categories/${id}`),
  create: async (payload: NewItemCategoryRequest) =>
    await fetcher("items/categories", JSON.stringify(payload), {
      method: "POST",
    }),
  updateById: async (id: number, updateData: EditItemCategoryRequest) => {
    const payload: EditItemCategoryPayload = {
      name: updateData.name,
    };
    return await fetcher(`items/categories/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default itemCategory;
