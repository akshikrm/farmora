import type {
  NewItemRequest,
  EditItemPayload,
  EditItemRequest,
} from "@app-types/item-category.types";
import fetcher from "@utils/fetcher";
import fetcherV2 from "@utils/fetcherV2";

const items = {
  fetchAll: () => fetcher("items/categories"),
  getNames: () => fetcher("items/categories/names"),
  fetchById: (id: number) =>
    fetcherV2<EditItemRequest>(`items/categories/${id}`),
  create: async (payload: NewItemRequest) => {
    return await fetcherV2("items/categories", JSON.stringify(payload), {
      method: "POST",
    });
  },
  updateById: async (id: number, updateData: EditItemRequest) => {
    const payload: EditItemPayload = {
      name: updateData.name,
      type: updateData.type,
      base_price: updateData.base_price,
      vendor_id: updateData.vendor_id,
    };
    return await fetcherV2(`items/categories/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default items;
