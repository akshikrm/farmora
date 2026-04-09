import type {
  WorkingCostFormValues,
  WorkingCostListResponse,
  NewWorkingCostRequest,
} from "./types";
import fetcherV2 from "@utils/fetcherV2";

const workingCost = {
  fetchAll: (filter: {
    season_id: number;
    start_date?: string;
    end_date?: string;
  }) => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcherV2<WorkingCostListResponse>("working-costs", null, opts);
  },

  fetchById: (id: number) => {
    return fetcherV2<WorkingCostFormValues>(`working-costs/${id}`);
  },

  create: async (payload: NewWorkingCostRequest) => {
    return await fetcherV2("working-costs", JSON.stringify(payload), {
      method: "POST",
    });
  },

  updateById: async (id: number, updatedData: NewWorkingCostRequest) => {
    const payload = {
      season_id: updatedData.season_id,
      purpose: updatedData.purpose,
      amount: updatedData.amount,
      date: updatedData.date,
      payment_type: updatedData.payment_type,
    };
    return await fetcherV2(`working-costs/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default workingCost;
