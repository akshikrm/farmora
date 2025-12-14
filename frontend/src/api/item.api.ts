import type {
  NewItemRequest,
  EditItemPayload,
  EditItemRequest,
  Item,
} from "@app-types/item.types";
import type { ListResponse } from "@app-types/response.types";
import fetcher from "@utils/fetcher";

const item = {
  fetchAll: (filter?: {}): Promise<ListResponse<Item>> => {
    console.log("Fetching items with filter:", filter);
    const opts = {
      method: "GET",
      filter: filter,
    };

    return fetcher("items", null, opts);
  },
  fetchById: async (id: number) => {
    const data = await fetcher(`items/${id}`);
    const temp: EditItemRequest = {
      id: data.id,
      name: data.name,
      assign_quantity: data.quantity,
      batch_id: data.batch.id,
      category_id: data.category.id,
      discount_price: data.discount_price,
      price_per_unit: data.price_per_unit,
      quantity: data.quantity,
      total_price: data.total_price,
      vendor_id: data.vendor.id,
    };
    return temp;
  },
  create: async (payload: NewItemRequest) =>
    await fetcher("items", JSON.stringify(payload), {
      method: "POST",
    }),
  updateById: async (id: number, updateData: EditItemRequest) => {
    const payload: EditItemPayload = {
      name: updateData.name,
    };
    return await fetcher(`items/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default item;
