import type {
  NewItemReturnRequest,
  EditItemReturnPayload,
  EditItemReturnRequest,
  ItemReturn,
} from "@app-types/item-return.types";
import type { ListResponse } from "@app-types/response.types";
import fetcher from "@utils/fetcher";

const itemReturn = {
  fetchAll: (filter?: {}): Promise<ListResponse<ItemReturn>> => {
    console.log("Fetching item returns with filter:", filter);
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcher("item-returns", null, opts);
  },
  fetchById: async (id: number): Promise<EditItemReturnRequest> => {
    const data = await fetcher(`item-returns/${id}`);
    const temp: EditItemReturnRequest = {
      id: data.id,
      return_type: data.return_type,
      item_category_id: data.category?.id || data.item_category_id,
      date: data.date,
      from_batch: data.from_batch_data?.id || data.from_batch,
      to_batch: data.to_batch_data?.id || data.to_batch,
      to_vendor: data.to_vendor_data?.id || data.to_vendor,
      quantity: data.quantity,
      rate_per_bag: data.rate_per_bag,
      total_amount: data.total_amount,
      status: data.status,
    };
    return temp;
  },
  create: async (payload: NewItemReturnRequest) =>
    await fetcher("item-returns", JSON.stringify(payload), {
      method: "POST",
    }),
  updateById: async (id: number, updateData: EditItemReturnRequest) => {
    const payload: EditItemReturnPayload = {
      return_type: updateData.return_type,
      item_category_id: updateData.item_category_id,
      date: updateData.date,
      from_batch: updateData.from_batch,
      to_batch: updateData.to_batch,
      to_vendor: updateData.to_vendor,
      quantity: updateData.quantity,
      rate_per_bag: updateData.rate_per_bag,
      total_amount: updateData.total_amount,
      status: updateData.status,
    };
    return await fetcher(`item-returns/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default itemReturn;
