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
      invoice_date: data.invoice_date,
      invoice_number: data.invoice_number,
      net_amount: data.net_amount,
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
      total_price: updateData.total_price,
      quantity: updateData.quantity,
      vendor_id: updateData.vendor_id,
      discount_price: updateData.discount_price,
      price_per_unit: updateData.price_per_unit,
      category_id: updateData.category_id,
      batch_id: updateData.batch_id,
      assign_quantity: updateData.assign_quantity,
      invoice_date: updateData.invoice_date,
      invoice_number: updateData.invoice_number,
      net_amount: updateData.net_amount,
    };
    return await fetcher(`items/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default item;
