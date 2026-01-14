import type { SalesBookLedger, NewSalesBookEntryRequest } from "@app-types/sales-book.types";
import fetcher from "@utils/fetcher";

const salesBook = {
  fetchLedger: (filter: {
    buyer_id: number;
    from_date?: string;
    end_date?: string;
  }): Promise<SalesBookLedger> => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcher("sales/ledger", null, opts);
  },
  create: async (payload: NewSalesBookEntryRequest) =>
    await fetcher("sales/ledger", JSON.stringify(payload), { method: "POST" }),
};

export default salesBook;
