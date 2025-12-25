import type { IntegrationBookResponse } from "@app-types/integration-book.types";
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
};

export default integrationBook;
