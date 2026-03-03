import type { ItemListResponse, ItemFormValues } from "./types";
import fetcher from "@utils/fetcher";
import fetcherV2 from "@utils/fetcherV2";

const items = {
  fetchAll: () => fetcherV2<ItemListResponse>("items/categories"),
  getNames: () => fetcher("items/categories/names"),
  fetchById: (id: number) =>
    fetcherV2<ItemFormValues>(`items/categories/${id}`),
  create: async (payload: ItemFormValues) => {
    return await fetcherV2("items/categories", JSON.stringify(payload), {
      method: "POST",
    });
  },
  updateById: async (id: number, updateData: ItemFormValues) => {
    const payload: ItemFormValues = {
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
