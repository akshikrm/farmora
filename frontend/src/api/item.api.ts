import type {
  NewPurchaseRequest,
  EditPurchasePayload,
  EditPurchaseRequest,
  Purchase,
} from "@app-types/item.types";
import type { ListResponse } from "@app-types/response.types";
import fetcherV2 from "@utils/fetcherV2";

const purchase = {
  fetchAll: (filter?: {}) => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcherV2<ListResponse<Purchase>>("purchases", null, opts);
  },
  fetchById: async (id: number) => {
    return await fetcherV2<EditPurchaseRequest>(`items/${id}`);
  },
  create: async (payload: NewPurchaseRequest) => {
    return await fetcherV2<NewPurchaseRequest>(
      "items",
      JSON.stringify(payload),
      {
        method: "POST",
      },
    );
  },
  updateById: async (id: number, updateData: EditPurchaseRequest) => {
    const payload: EditPurchasePayload = {
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
      payment_type: updateData.payment_type,
    };
    return await fetcherV2(`items/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default purchase;
