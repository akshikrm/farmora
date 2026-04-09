import type {
  IntegrationBookFilterRequest,
  IntegrationBookFormValues,
  IntegrationBookListResponse,
} from "./types";
import fetcherV2 from "@utils/fetcherV2";

const integrationBook = {
  fetchAll: (filter: IntegrationBookFilterRequest) => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcherV2<IntegrationBookListResponse>(
      "integration-book",
      null,
      opts,
    );
  },
  fetchById: (id: number) => {
    return fetcherV2<IntegrationBookFormValues>(`integration-book/${id}`);
  },
  create: async (payload: IntegrationBookFormValues) => {
    return await fetcherV2("integration-book", JSON.stringify(payload), {
      method: "POST",
    });
  },
  updateById: async (id: number, updatedData: IntegrationBookFormValues) => {
    const payload: IntegrationBookFormValues = {
      farm_id: updatedData.farm_id,
      amount: updatedData.amount,
      date: updatedData.date,
      payment_type: updatedData.payment_type,
    };
    return await fetcherV2(`integration-book/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default integrationBook;
