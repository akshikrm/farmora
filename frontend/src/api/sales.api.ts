import type {
  NewSaleRequest,
  EditSalePayload,
  EditSaleRequest,
  Sale,
} from "@app-types/sales.types";
import type { ListResponse } from "@app-types/response.types";
import fetcher from "@utils/fetcher";

const sales = {
  fetchAll: (filter?: {}): Promise<ListResponse<Sale>> => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcher("sales", null, opts);
  },
  fetchById: async (id: number) => {
    const data = await fetcher(`sales/${id}`);
    const temp: EditSaleRequest = {
      id: data.id,
      season_id: data.season.id,
      batch_id: data.batch.id,
      date: data.date,
      buyer_id: data.buyer.id,
      vehicle_no: data.vehicle_no,
      weight: data.weight,
      bird_no: data.bird_no,
      payment_type: data.payment_type,
      price: data.price,
      narration: data.narration,
    };
    return temp;
  },
  create: async (payload: NewSaleRequest) =>
    await fetcher("sales", JSON.stringify(payload), {
      method: "POST",
    }),
  updateById: async (id: number, updateData: EditSaleRequest) => {
    const payload: EditSalePayload = {
      season_id: updateData.season_id,
      batch_id: updateData.batch_id,
      date: updateData.date,
      buyer_id: updateData.buyer_id,
      vehicle_no: updateData.vehicle_no,
      weight: updateData.weight,
      bird_no: updateData.bird_no,
      payment_type: updateData.payment_type,
      price: updateData.price,
      narration: updateData.narration,
    };
    return await fetcher(`sales/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default sales;
