import type { 
  IntegrationBookResponse,
  NewIntegrationBookRequest,
} from "@app-types/integration-book.types";
import fetcher from "@utils/fetcher";

const integrationBook = {
  fetchAll: (filter: {
    farm_id: number;
    start_date?: string;
    end_date?: string;
  }): Promise<IntegrationBookResponse> => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcher("items/integration-book", null, opts);
  },
  create: async (payload: NewIntegrationBookRequest) =>
    await fetcher("integration-book", JSON.stringify(payload), { method: "POST" }),
};

export default integrationBook;
